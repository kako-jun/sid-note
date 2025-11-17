use wasm_bindgen::prelude::*;

/// クロマチックノート判定（chromaticUtil.ts の isChromaticNote() に相当）
/// nextNoteが存在し、かつ前後が半音（クロマチック）でつながっている場合true
#[wasm_bindgen]
pub fn is_chromatic_note(note_pitch: Option<String>, next_note_pitch: Option<String>) -> bool {
    let pitch1 = match note_pitch {
        Some(p) => p,
        None => return false,
    };

    let pitch2 = match next_note_pitch {
        Some(p) => p,
        None => return false,
    };

    let i1 = match get_absolute_pitch_index(&pitch1) {
        Some(i) => i,
        None => return false,
    };

    let i2 = match get_absolute_pitch_index(&pitch2) {
        Some(i) => i,
        None => return false,
    };

    // 隣り合う半音かどうか
    (i1 as i32 - i2 as i32).abs() == 1
}

/// 絶対的な半音インデックスを取得
fn get_absolute_pitch_index(pitch: &str) -> Option<usize> {
    // 例: C＃4, D♭3 など
    // 正規表現 ^([A-G][＃♭]?)(\d+)$ に相当
    let mut chars = pitch.chars().peekable();

    // 音名部分を抽出
    let mut name = String::new();
    if let Some(c) = chars.next() {
        if c < 'A' || c > 'G' {
            return None;
        }
        name.push(c);
    } else {
        return None;
    }

    // アクシデンタルがあれば追加
    if let Some(&c) = chars.peek() {
        if c == '＃' || c == '♭' {
            name.push(c);
            chars.next();
        }
    }

    // オクターブ番号を抽出
    let octave_str: String = chars.collect();
    let octave: usize = octave_str.parse().ok()?;

    // 12音階配列
    let chromatic = vec![
        "C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B",
    ];

    // nameが含まれるインデックスを探す
    let idx = chromatic
        .iter()
        .position(|x| x.split('/').any(|part| part == name))?;

    Some(octave * 12 + idx)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_absolute_pitch_index() {
        assert_eq!(get_absolute_pitch_index("C2"), Some(24));
        assert_eq!(get_absolute_pitch_index("C＃2"), Some(25));
        assert_eq!(get_absolute_pitch_index("D2"), Some(26));
    }

    #[test]
    fn test_is_chromatic_note() {
        // C2 -> C＃2 は半音差
        assert!(is_chromatic_note(
            Some("C2".to_string()),
            Some("C＃2".to_string())
        ));

        // C2 -> D2 は全音差
        assert!(!is_chromatic_note(
            Some("C2".to_string()),
            Some("D2".to_string())
        ));

        // None の場合
        assert!(!is_chromatic_note(None, Some("C2".to_string())));
        assert!(!is_chromatic_note(Some("C2".to_string()), None));
    }
}
