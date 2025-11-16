use super::parser::*;
use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

/// ギターの弦とフレットのポジション
#[wasm_bindgen]
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Position {
    string: i32,
    fret: i32,
    pitch: String,
    interval: String,
}

#[wasm_bindgen]
impl Position {
    #[wasm_bindgen(getter)]
    pub fn string(&self) -> i32 {
        self.string
    }

    #[wasm_bindgen(getter)]
    pub fn fret(&self) -> i32 {
        self.fret
    }

    #[wasm_bindgen(getter)]
    pub fn pitch(&self) -> String {
        self.pitch.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn interval(&self) -> String {
        self.interval.clone()
    }
}

/// フレットとピッチ情報
#[derive(Clone, Debug)]
struct FretWithPitch {
    interval: String,
    fret: i32,
    pitch: String,
}

/// getPitches()相当の関数
fn get_pitches(root: &str, frets: &[Fret], offset: i32) -> Vec<FretWithPitch> {
    let pitch_map = get_pitch_map(root);

    // ルート音のインデックスを見つける
    let root_index = pitch_map
        .iter()
        .position(|pitch_text| {
            pitch_text.split('/').any(|p| p == root)
        })
        .unwrap_or(0);

    frets
        .iter()
        .map(|fret| {
            let pitch_index = (root_index + fret.fret as usize) % 12;
            FretWithPitch {
                interval: fret.interval.clone(),
                fret: fret.fret + offset,
                pitch: pitch_map[pitch_index].clone(),
            }
        })
        .collect()
}

/// convertFretsToPositions()相当の関数
fn convert_frets_to_positions(frets: &[FretWithPitch]) -> Vec<Position> {
    let mut positions = Vec::new();

    for fret_with_pitch in frets {
        let fret = fret_with_pitch.fret;
        let pitch = &fret_with_pitch.pitch;
        let interval = &fret_with_pitch.interval;

        // 弦1（15〜39フレット）
        if fret >= 15 && fret <= 39 {
            positions.push(Position {
                string: 1,
                fret: (fret - 15) % 25,
                pitch: pitch.clone(),
                interval: interval.clone(),
            });
        }

        // 弦2（10〜34フレット）
        if fret >= 10 && fret <= 34 {
            positions.push(Position {
                string: 2,
                fret: (fret - 10) % 25,
                pitch: pitch.clone(),
                interval: interval.clone(),
            });
        }

        // 弦3（5〜29フレット）
        if fret >= 5 && fret <= 29 {
            positions.push(Position {
                string: 3,
                fret: (fret - 5) % 25,
                pitch: pitch.clone(),
                interval: interval.clone(),
            });
        }

        // 弦4（0〜24フレット）
        if fret >= 0 && fret <= 24 {
            positions.push(Position {
                string: 4,
                fret,
                pitch: pitch.clone(),
                interval: interval.clone(),
            });
        }
    }

    positions
}

/// コード名からポジション配列を取得（chordUtil.ts の getChordPositions() に相当）
#[wasm_bindgen]
pub fn get_chord_positions(chord: &str) -> JsValue {
    let positions = get_chord_positions_internal(chord);
    serde_wasm_bindgen::to_value(&positions).unwrap()
}

/// 内部用のポジション取得関数
fn get_chord_positions_internal(chord: &str) -> Vec<Position> {
    // 特別なコード判定
    let is_all_keys = chord == "ALL_KEYS";
    let is_white_keys = chord == "WHITE_KEYS";
    let is_power_chord = chord.ends_with("5") && !chord.contains("♭5") && !chord.contains("-5");
    let is_octave_unison = chord.contains("8") && !chord.chars().nth(chord.find("8").unwrap() + 1).map_or(false, |c| c.is_numeric());

    let (frets, use_root) = if is_all_keys {
        let frets = vec![
            Fret { interval: "1".to_string(), fret: 0 },
            Fret { interval: "♭2".to_string(), fret: 1 },
            Fret { interval: "2".to_string(), fret: 2 },
            Fret { interval: "♭3".to_string(), fret: 3 },
            Fret { interval: "3".to_string(), fret: 4 },
            Fret { interval: "4".to_string(), fret: 5 },
            Fret { interval: "♭5".to_string(), fret: 6 },
            Fret { interval: "5".to_string(), fret: 7 },
            Fret { interval: "＃5".to_string(), fret: 8 },
            Fret { interval: "6".to_string(), fret: 9 },
            Fret { interval: "♭7".to_string(), fret: 10 },
            Fret { interval: "7".to_string(), fret: 11 },
        ];
        (frets, "C".to_string())
    } else if is_white_keys {
        let frets = vec![
            Fret { interval: "1".to_string(), fret: 0 },
            Fret { interval: "2".to_string(), fret: 2 },
            Fret { interval: "3".to_string(), fret: 4 },
            Fret { interval: "4".to_string(), fret: 5 },
            Fret { interval: "5".to_string(), fret: 7 },
            Fret { interval: "6".to_string(), fret: 9 },
            Fret { interval: "7".to_string(), fret: 11 },
        ];
        (frets, "C".to_string())
    } else if is_power_chord {
        let frets = vec![
            Fret { interval: "1".to_string(), fret: 0 },
            Fret { interval: "5".to_string(), fret: 7 },
        ];
        (frets, get_root_note(chord))
    } else if is_octave_unison {
        let frets = vec![
            Fret { interval: "1".to_string(), fret: 0 },
            Fret { interval: "8".to_string(), fret: 12 },
        ];
        (frets, get_root_note(chord))
    } else {
        // 通常のコード解析
        let has_7th = chord.contains("7");
        let is_maj7 = chord.contains("maj7") || chord.contains("M7") || chord.contains("△7");
        let is_aug7 = chord.contains("aug7") || chord.contains("+7") || chord.contains("＃7");
        let is_m7 = has_7th && !is_maj7 && !is_aug7;

        let is_sus4 = chord.contains("sus4");
        let is_minor = chord.contains("m") && !chord.contains("maj") && !chord.contains("dim");
        let _is_aug = chord.contains("aug") || chord.contains("+5") || chord.contains("＃5");
        let is_dim = chord.contains("♭5") || chord.contains("-5") || chord.contains("b5") || chord.contains("dim");

        let m3 = is_minor || is_dim;
        let dim5 = is_dim;
        let maj7 = is_maj7;
        let m7 = is_m7;
        let aug7 = is_aug7;

        let frets = get_frets(m3, is_sus4, dim5, maj7, m7, aug7);
        (frets, get_root_note(chord))
    };

    let offset = get_fret_offset(&use_root);
    let frets_with_pitch = get_pitches(&use_root, &frets, offset - 12);

    // オクターブ番号をCで切り替える
    let mut current_octave = 0;
    let octave_frets: Vec<FretWithPitch> = frets_with_pitch
        .iter()
        .flat_map(|fret| {
            let pitch_name = fret.pitch.replace(char::is_numeric, "");

            // Cまたは Dで始まる場合オクターブを1に
            if pitch_name.starts_with("C") || pitch_name.starts_with("D") {
                current_octave = 1;
            }

            vec![
                FretWithPitch {
                    fret: fret.fret,
                    interval: fret.interval.clone(),
                    pitch: format!("{}{}", pitch_name, current_octave),
                },
                FretWithPitch {
                    fret: fret.fret + 12,
                    interval: fret.interval.clone(),
                    pitch: format!("{}{}", pitch_name, current_octave + 1),
                },
                FretWithPitch {
                    fret: fret.fret + 24,
                    interval: fret.interval.clone(),
                    pitch: format!("{}{}", pitch_name, current_octave + 2),
                },
                FretWithPitch {
                    fret: fret.fret + 36,
                    interval: fret.interval.clone(),
                    pitch: format!("{}{}", pitch_name, current_octave + 3),
                },
            ]
            .into_iter()
            .filter(|f| f.fret >= 0 && f.fret <= 39)
            .collect::<Vec<_>>()
        })
        .collect();

    convert_frets_to_positions(&octave_frets)
}

/// インターバル記号を取得（chordUtil.ts の getInterval() に相当）
#[wasm_bindgen]
pub fn get_interval(chord: &str, target_pitch: &str) -> String {
    let target_name = target_pitch.replace(char::is_numeric, "");
    let root = get_root_note(chord);
    let pitches = get_pitch_map(&root);

    let index = pitches
        .iter()
        .position(|pitch| {
            pitch
                .split('/')
                .any(|p| p.replace(char::is_numeric, "") == target_name)
        })
        .unwrap_or(0);

    let interval_map = [
        "1", "♭2", "2", "♭3", "3", "4", "＃4/♭5", "5", "＃5", "6", "♭7", "7",
    ];

    interval_map[index].to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_chord_positions() {
        let positions = get_chord_positions_internal("C");
        assert!(!positions.is_empty());
    }

    #[test]
    fn test_get_interval() {
        assert_eq!(get_interval("C", "C2"), "1");
        assert_eq!(get_interval("C", "E2"), "3");
        assert_eq!(get_interval("C", "G2"), "5");
    }
}
