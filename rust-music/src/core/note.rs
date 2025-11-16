use wasm_bindgen::prelude::*;

/// 五線譜のライン番号を取得（noteUtil.ts の getLine() に相当）
/// E1〜G4の範囲をサポート
#[wasm_bindgen]
pub fn get_line(pitch: &str) -> Option<f32> {
    match pitch {
        // オクターブ1
        "E1" => Some(0.0),
        "E＃1" => Some(1.0),
        "F♭1" => Some(0.0),
        "F1" => Some(1.0),
        "F＃1" => Some(1.5),
        "G♭1" => Some(1.5),
        "G1" => Some(2.0),
        "G＃1" => Some(2.5),
        "A♭1" => Some(2.5),
        "A1" => Some(3.0),
        "A＃1" => Some(3.5),
        "B♭1" => Some(3.5),
        "B1" => Some(4.0),
        "B＃1" => Some(5.0),
        "C♭2" => Some(4.0),

        // オクターブ2
        "C2" => Some(5.0),
        "C＃2" => Some(5.5),
        "D♭2" => Some(5.5),
        "D2" => Some(6.0),
        "D＃2" => Some(6.5),
        "E♭2" => Some(6.5),
        "E2" => Some(7.0),
        "E＃2" => Some(8.0),
        "F♭2" => Some(7.0),
        "F2" => Some(8.0),
        "F＃2" => Some(8.5),
        "G♭2" => Some(8.5),
        "G2" => Some(9.0),
        "G＃2" => Some(9.5),
        "A♭2" => Some(9.5),
        "A2" => Some(10.0),
        "A＃2" => Some(10.5),
        "B♭2" => Some(10.5),
        "B2" => Some(11.0),
        "B＃2" => Some(12.0),
        "C♭3" => Some(11.0),

        // オクターブ3
        "C3" => Some(12.0),
        "C＃3" => Some(12.5),
        "D♭3" => Some(12.5),
        "D3" => Some(13.0),
        "D＃3" => Some(13.5),
        "E♭3" => Some(13.5),
        "E3" => Some(14.0),
        "E＃3" => Some(15.0),
        "F♭3" => Some(14.0),
        "F3" => Some(15.0),
        "F＃3" => Some(15.5),
        "G♭3" => Some(15.5),
        "G3" => Some(16.0),
        "G＃3" => Some(16.5),
        "A♭3" => Some(16.5),
        "A3" => Some(17.0),
        "A＃3" => Some(17.5),
        "B♭3" => Some(17.5),
        "B3" => Some(18.0),
        "B＃3" => Some(19.0),
        "C♭4" => Some(18.0),

        // オクターブ4
        "C4" => Some(19.0),
        "C＃4" => Some(19.5),
        "D♭4" => Some(19.5),
        "D4" => Some(20.0),
        "D＃4" => Some(20.5),
        "E♭4" => Some(20.5),
        "E4" => Some(21.0),
        "E＃4" => Some(22.0),
        "F♭4" => Some(21.0),
        "F4" => Some(22.0),
        "F＃4" => Some(22.5),
        "G♭4" => Some(22.5),
        "G4" => Some(23.0),

        _ => None,
    }
}

/// 五度圏での位置を取得（noteUtil.ts の getKeyPosition() に相当）
#[wasm_bindgen]
pub struct KeyPosition {
    circle: String,
    index: i32,
}

#[wasm_bindgen]
impl KeyPosition {
    #[wasm_bindgen(getter)]
    pub fn circle(&self) -> String {
        self.circle.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn index(&self) -> i32 {
        self.index
    }
}

#[wasm_bindgen]
pub fn get_key_position(scale: &str) -> KeyPosition {
    let major_keys = vec![
        "C", "G", "D", "A", "E", "B", "F＃", "D♭", "A♭", "E♭", "B♭", "F",
    ];
    let minor_keys = vec![
        "Am", "Em", "Bm", "F＃m", "C＃m", "G＃m", "D＃m", "B♭m", "Fm", "Cm", "Gm", "Dm",
    ];

    if let Some(idx) = major_keys.iter().position(|&k| k == scale) {
        KeyPosition {
            circle: "outer".to_string(),
            index: idx as i32,
        }
    } else if let Some(idx) = minor_keys.iter().position(|&k| k == scale) {
        KeyPosition {
            circle: "inner".to_string(),
            index: idx as i32,
        }
    } else {
        KeyPosition {
            circle: "none".to_string(),
            index: -1,
        }
    }
}

/// ピッチの異名同音比較（noteUtil.ts の comparePitch() に相当）
#[wasm_bindgen]
pub fn compare_pitch(pitch1: &str, pitch2: &str) -> bool {
    // 半音インデックスを取得して比較
    fn get_pitch_index(p: &str) -> Option<(usize, usize)> {
        // 最後の文字が数字かチェック
        let last_char = p.chars().last()?;
        if !last_char.is_numeric() {
            return None;
        }
        let octave: usize = last_char.to_string().parse().ok()?;
        let note_part = &p[..p.len() - 1];

        // 12音階配列
        let chromatic = vec![
            "C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B",
        ];

        // note_partが含まれるインデックスを探す
        let idx = chromatic
            .iter()
            .position(|&x| x.split('/').any(|part| part == note_part))?;

        Some((octave, idx))
    }

    let p1 = match get_pitch_index(pitch1) {
        Some(p) => p,
        None => return false,
    };
    let p2 = match get_pitch_index(pitch2) {
        Some(p) => p,
        None => return false,
    };

    // オクターブと半音インデックスが一致すればtrue
    p1 == p2
}

/// 音符の値を英語テキストに変換（noteUtil.ts の valueText() に相当）
#[wasm_bindgen]
pub fn value_text(value: &str) -> String {
    match value {
        "whole" => "Whole Note",
        "dotted_whole" => "Dotted Whole Note",
        "half" => "Half Note",
        "dotted_half" => "Dotted Half Note",
        "quarter" => "Quarter Note",
        "dotted_quarter" => "Dotted Quarter Note",
        "8th" => "8th Note",
        "dotted_8th" => "Dotted 8th Note",
        "16th" => "16th Note",
        "dotted_16th" => "Dotted 16th Note",
        "triplet_quarter" => "Quarter Triplet",
        "triplet_8th" => "8th Triplet",
        "triplet_16th" => "16th Triplet",
        _ => "",
    }
    .to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_line() {
        assert_eq!(get_line("C2"), Some(5.0));
        assert_eq!(get_line("E1"), Some(0.0));
        assert_eq!(get_line("G4"), Some(23.0));
        assert_eq!(get_line("X1"), None);
    }

    #[test]
    fn test_compare_pitch() {
        assert!(compare_pitch("C2", "C2"));
        assert!(compare_pitch("C＃2", "D♭2"));
        assert!(!compare_pitch("C2", "D2"));
        assert!(!compare_pitch("C2", "C3"));
    }

    #[test]
    fn test_value_text() {
        assert_eq!(value_text("whole"), "Whole Note");
        assert_eq!(value_text("quarter"), "Quarter Note");
        assert_eq!(value_text("unknown"), "");
    }
}
