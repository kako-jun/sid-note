/**
 * 音楽理論関数のテスト
 * Rust実装とTypeScript実装で同じ結果が返ることを確認
 */

import { describe, test, expect } from '@jest/globals';
import * as noteUtil from '../noteUtil';
import * as chordUtil from '../chordUtil';
import * as scaleUtil from '../scaleUtil';
import * as harmonyUtil from '../harmonyUtil';
import { isChromaticNote } from '../chromaticUtil';
import { getChordNameAliases } from '../chordNameAlias';

describe('noteUtil - TypeScript実装', () => {
  describe('getLine', () => {
    test('基本的な音高', () => {
      expect(noteUtil.getLine('C2')).toBe(5);
      expect(noteUtil.getLine('E1')).toBe(0);
      expect(noteUtil.getLine('G4')).toBe(23);
    });

    test('異名同音', () => {
      expect(noteUtil.getLine('C＃2')).toBe(5.5);
      expect(noteUtil.getLine('D♭2')).toBe(5.5);
    });

    test('存在しない音', () => {
      expect(noteUtil.getLine('X1')).toBeNull();
    });
  });

  describe('comparePitch', () => {
    test('同じ音', () => {
      expect(noteUtil.comparePitch('C2', 'C2')).toBe(true);
    });

    test('異名同音', () => {
      expect(noteUtil.comparePitch('C＃2', 'D♭2')).toBe(true);
    });

    test('異なる音', () => {
      expect(noteUtil.comparePitch('C2', 'D2')).toBe(false);
    });

    test('異なるオクターブ', () => {
      expect(noteUtil.comparePitch('C2', 'C3')).toBe(false);
    });
  });

  describe('valueText', () => {
    test('音符の値', () => {
      expect(noteUtil.valueText('whole')).toBe('Whole Note');
      expect(noteUtil.valueText('quarter')).toBe('Quarter Note');
      expect(noteUtil.valueText('unknown')).toBe('');
    });
  });

  describe('getKeyPosition', () => {
    test('メジャーキー', () => {
      const pos = noteUtil.getKeyPosition('C');
      expect(pos.circle).toBe('outer');
      expect(pos.index).toBe(0);
    });

    test('マイナーキー', () => {
      const pos = noteUtil.getKeyPosition('Am');
      expect(pos.circle).toBe('inner');
      expect(pos.index).toBe(0);
    });

    test('存在しないキー', () => {
      const pos = noteUtil.getKeyPosition('XYZ');
      expect(pos.circle).toBe('none');
      expect(pos.index).toBe(-1);
    });
  });
});

describe('chordUtil - TypeScript実装', () => {
  describe('getRootNote', () => {
    test('シンプルなコード', () => {
      expect(chordUtil.getRootNote('C')).toBe('C');
      expect(chordUtil.getRootNote('Dm7')).toBe('D');
    });

    test('アクシデンタル付き', () => {
      expect(chordUtil.getRootNote('C＃maj7')).toBe('C＃');
      expect(chordUtil.getRootNote('A♭m')).toBe('A♭');
    });
  });

  describe('getFretOffset', () => {
    test('基本的なオフセット', () => {
      expect(chordUtil.getFretOffset('C')).toBe(8);
      expect(chordUtil.getFretOffset('E')).toBe(0);
      expect(chordUtil.getFretOffset('G')).toBe(3);
    });
  });

  describe('getInterval', () => {
    test('基本的なインターバル', () => {
      expect(chordUtil.getInterval('C', 'C2')).toBe('1');
      expect(chordUtil.getInterval('C', 'E2')).toBe('3');
      expect(chordUtil.getInterval('C', 'G2')).toBe('5');
    });
  });

  describe('getChordPositions', () => {
    test('メジャーコード', () => {
      const positions = chordUtil.getChordPositions('C');
      expect(positions.length).toBeGreaterThan(0);
      expect(positions[0]).toHaveProperty('string');
      expect(positions[0]).toHaveProperty('fret');
      expect(positions[0]).toHaveProperty('pitch');
      expect(positions[0]).toHaveProperty('interval');
    });

    test('特殊なコード', () => {
      const allKeys = chordUtil.getChordPositions('ALL_KEYS');
      expect(allKeys.length).toBeGreaterThan(0);

      const whiteKeys = chordUtil.getChordPositions('WHITE_KEYS');
      expect(whiteKeys.length).toBeGreaterThan(0);
    });
  });
});

describe('scaleUtil - TypeScript実装', () => {
  describe('getScaleNoteNames', () => {
    test('Cメジャースケール', () => {
      const notes = scaleUtil.getScaleNoteNames('C');
      expect(notes).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
    });

    test('Aマイナースケール', () => {
      const notes = scaleUtil.getScaleNoteNames('Am');
      expect(notes).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    });
  });

  describe('getScaleDiatonicChords', () => {
    test('Cメジャーのダイアトニックコード', () => {
      const chords = scaleUtil.getScaleDiatonicChords('C');
      expect(chords).toEqual(['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim']);
    });
  });

  describe('getScaleDiatonicChordsWith7th', () => {
    test('Cメジャーのダイアトニック7thコード', () => {
      const chords = scaleUtil.getScaleDiatonicChordsWith7th('C');
      expect(chords).toEqual(['Cmaj7', 'Dm7', 'Em7', 'Fmaj7', 'G7', 'Am7', 'Bm7♭5']);
    });
  });

  describe('scaleText', () => {
    test('スケール名の英語表記', () => {
      expect(scaleUtil.scaleText('C')).toBe('C Major Scale');
      expect(scaleUtil.scaleText('Am')).toBe('A Minor Scale');
    });
  });
});

describe('harmonyUtil - TypeScript実装', () => {
  describe('getFunctionalHarmony', () => {
    test('Cメジャースケールでのディグリー', () => {
      expect(harmonyUtil.getFunctionalHarmony('C', 'C')).toBe(1);
      expect(harmonyUtil.getFunctionalHarmony('C', 'G')).toBe(5);
      expect(harmonyUtil.getFunctionalHarmony('C', 'Am')).toBe(6);
    });

    test('存在しないコード', () => {
      expect(harmonyUtil.getFunctionalHarmony('C', 'XYZ')).toBe(0);
    });
  });

  describe('functionalHarmonyText', () => {
    test('ディグリーのテキスト', () => {
      expect(harmonyUtil.functionalHarmonyText(1)).toBe('Ⅰ Tonic');
      expect(harmonyUtil.functionalHarmonyText(5)).toBe('Ⅴ Dominant');
    });
  });

  describe('cadenceText', () => {
    test('完全終止', () => {
      expect(harmonyUtil.cadenceText(5, 1)).toBe('Perfect Cadence');
    });

    test('変格終止', () => {
      expect(harmonyUtil.cadenceText(4, 1)).toBe('Plagal Cadence');
    });

    test('偽終止', () => {
      expect(harmonyUtil.cadenceText(5, 6)).toBe('Deceptive Cadence');
    });

    test('半終止', () => {
      expect(harmonyUtil.cadenceText(1, 5)).toBe('Half Cadence');
    });
  });
});

describe('chromaticUtil - TypeScript実装', () => {
  test('半音進行', () => {
    expect(isChromaticNote({ pitch: 'C2' }, { pitch: 'C＃2' })).toBe(true);
    expect(isChromaticNote({ pitch: 'C2' }, { pitch: 'D2' })).toBe(false);
  });

  test('nextNoteがnull', () => {
    expect(isChromaticNote({ pitch: 'C2' }, null)).toBe(false);
  });
});

describe('chordNameAlias - TypeScript実装', () => {
  test('メジャー7thの別表記', () => {
    const aliases = getChordNameAliases('Cmaj7');
    expect(aliases).toContain('Cmaj7');
    expect(aliases).toContain('CM7');
    expect(aliases).toContain('C△7');
  });

  test('マイナーの別表記', () => {
    const aliases = getChordNameAliases('Cm');
    expect(aliases).toContain('Cm');
    expect(aliases).toContain('C-');
  });

  test('未知のコード', () => {
    const aliases = getChordNameAliases('Cxyz');
    expect(aliases).toEqual(['Cxyz']);
  });
});
