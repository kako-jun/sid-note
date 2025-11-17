use wasm_bindgen::prelude::*;

/// コード名からルート音を抽出（chordUtil.ts の getRootNote() に相当）
#[wasm_bindgen]
pub fn get_root_note(chord: &str) -> String {
    // 正規表現 ^[A-G](♭|＃)? に相当
    let mut root = String::new();
    let mut chars = chord.chars();

    // 最初の文字（A-G）
    if let Some(c) = chars.next() {
        if c >= 'A' && c <= 'G' {
            root.push(c);
        } else {
            return String::new();
        }
    }

    // 2文字目がアクシデンタルか確認
    if let Some(c) = chars.next() {
        if c == '♭' || c == '＃' {
            root.push(c);
        }
    }

    root
}

/// フレットオフセットを取得（chordUtil.ts の getFretOffset() に相当）
#[wasm_bindgen]
pub fn get_fret_offset(root: &str) -> i32 {
    match root {
        "E" => 0,
        "E＃" => 1,
        "F♭" => 0,
        "F" => 1,
        "F＃" => 2,
        "G♭" => 2,
        "G" => 3,
        "G＃" => 4,
        "A♭" => 4,
        "A" => 5,
        "A＃" => 6,
        "B♭" => 6,
        "B" => 7,
        "B＃" => 8,
        "C♭" => 7,
        "C" => 8,
        "C＃" => 9,
        "D♭" => 9,
        "D" => 10,
        "D＃" => 11,
        "E♭" => 11,
        _ => 0,
    }
}

/// インターバルとフレット番号のペア（内部用）
#[derive(Clone, Debug)]
pub struct Fret {
    pub interval: String,
    pub fret: i32,
}

/// フレット配列を取得（chordUtil.ts の getFrets() に相当）
pub fn get_frets(
    m3: bool,
    sus4: bool,
    dim5: bool,
    maj7: bool,
    m7: bool,
    aug7: bool,
) -> Vec<Fret> {
    let mut frets = Vec::new();

    // Root
    frets.push(Fret {
        interval: "1".to_string(),
        fret: 0,
    });

    // 3rd
    if sus4 {
        frets.push(Fret {
            interval: "4".to_string(),
            fret: 5,
        });
    } else if m3 {
        frets.push(Fret {
            interval: "♭3".to_string(),
            fret: 3,
        });
    } else {
        frets.push(Fret {
            interval: "3".to_string(),
            fret: 4,
        });
    }

    // 5th
    if aug7 {
        frets.push(Fret {
            interval: "＃5".to_string(),
            fret: 8,
        });
    } else if dim5 {
        frets.push(Fret {
            interval: "♭5".to_string(),
            fret: 6,
        });
    } else {
        frets.push(Fret {
            interval: "5".to_string(),
            fret: 7,
        });
    }

    // 7th
    if aug7 {
        frets.push(Fret {
            interval: "♭7".to_string(),
            fret: 10,
        });
    } else if maj7 {
        frets.push(Fret {
            interval: "7".to_string(),
            fret: 11,
        });
    } else if m7 {
        frets.push(Fret {
            interval: "♭7".to_string(),
            fret: 10,
        });
    }

    frets
}

/// ピッチマップ（全12キー）
pub fn get_pitch_map(root: &str) -> Vec<String> {
    let map: Vec<Vec<&str>> = vec![
        vec!["C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B"],
        vec!["C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B", "C"],
        vec!["D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭"],
        vec!["D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭", "D"],
        vec!["E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭"],
        vec!["F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭", "E"],
        vec!["F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭", "E", "F"],
        vec!["G", "G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭"],
        vec!["G＃/A♭", "A", "A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G"],
        vec!["A", "A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭"],
        vec!["A＃/B♭", "B", "C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A"],
        vec!["B", "C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭"],
    ];

    // ルート音に対応するマップを返す
    let roots = vec!["C", "C＃/D♭", "D", "D＃/E♭", "E", "F", "F＃/G♭", "G", "G＃/A♭", "A", "A＃/B♭", "B"];

    for (i, &r) in roots.iter().enumerate() {
        if r.split('/').any(|s| s == root) {
            return map[i].iter().map(|s| s.to_string()).collect();
        }
    }

    // デフォルトはCのマップ
    map[0].iter().map(|s| s.to_string()).collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_root_note() {
        assert_eq!(get_root_note("C"), "C");
        assert_eq!(get_root_note("C＃maj7"), "C＃");
        assert_eq!(get_root_note("A♭m"), "A♭");
        assert_eq!(get_root_note("Dm7"), "D");
    }

    #[test]
    fn test_get_fret_offset() {
        assert_eq!(get_fret_offset("C"), 8);
        assert_eq!(get_fret_offset("E"), 0);
        assert_eq!(get_fret_offset("G"), 3);
    }

    #[test]
    fn test_get_frets() {
        // Major triad
        let frets = get_frets(false, false, false, false, false, false);
        assert_eq!(frets.len(), 3);
        assert_eq!(frets[0].interval, "1");
        assert_eq!(frets[1].interval, "3");
        assert_eq!(frets[2].interval, "5");
    }
}
