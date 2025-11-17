use wasm_bindgen::prelude::*;
use std::collections::HashMap;

/// コード名の別表記を取得（chordNameAlias.ts の getChordNameAliases() に相当）
/// 例: CM7 → ["CM7", "Cmaj7", "C△7"]
#[wasm_bindgen]
pub fn get_chord_name_aliases(chord: &str) -> Vec<JsValue> {
    let aliases = get_chord_name_aliases_internal(chord);
    aliases.iter().map(|s| JsValue::from_str(s)).collect()
}

/// 内部用のalias取得関数
fn get_chord_name_aliases_internal(chord: &str) -> Vec<String> {
    // ルート音部分を抽出
    let mut root = String::new();
    let mut chars = chord.chars();

    // 最初の文字（A-G）
    if let Some(c) = chars.next() {
        if c >= 'A' && c <= 'G' {
            root.push(c);
        } else {
            return vec![chord.to_string()];
        }
    } else {
        return vec![chord.to_string()];
    }

    // アクシデンタル（#, ＃, b, ♭）
    if let Some(c) = chars.clone().next() {
        if c == '#' || c == '＃' || c == 'b' || c == '♭' {
            root.push(c);
            chars.next();
        }
    }

    // タイプ部分
    let type_part: String = chars.collect();

    // 代表的なコードタイプの別表記マップ
    let type_alias_map = create_type_alias_map();

    // type部分がどれに該当するか判定
    for (key, aliases) in type_alias_map.iter() {
        if &type_part == key {
            return aliases.iter().map(|a| format!("{}{}", root, a)).collect();
        }
    }

    // マッチしなければそのまま
    vec![chord.to_string()]
}

/// コードタイプの別表記マップを作成
fn create_type_alias_map() -> HashMap<String, Vec<String>> {
    let mut map = HashMap::new();

    map.insert("".to_string(), vec!["".to_string(), "maj".to_string(), "△".to_string()]);
    map.insert("maj7".to_string(), vec!["maj7".to_string(), "M7".to_string(), "△7".to_string()]);
    map.insert("m7".to_string(), vec!["m7".to_string(), "-7".to_string()]);
    map.insert("7".to_string(), vec!["7".to_string()]);
    map.insert("m".to_string(), vec!["m".to_string(), "-".to_string()]);
    map.insert("dim".to_string(), vec!["dim".to_string(), "o".to_string()]);
    map.insert("aug".to_string(), vec!["aug".to_string(), "+".to_string()]);
    map.insert("sus4".to_string(), vec!["sus4".to_string(), "sus".to_string()]);
    map.insert("add9".to_string(), vec!["add9".to_string()]);
    map.insert("6".to_string(), vec!["6".to_string()]);
    map.insert("9".to_string(), vec!["9".to_string()]);
    map.insert("m_maj7".to_string(), vec!["m(maj7)".to_string(), "mM7".to_string(), "-M7".to_string()]);
    map.insert("m6".to_string(), vec!["m6".to_string(), "-6".to_string()]);
    map.insert("m9".to_string(), vec!["m9".to_string(), "-9".to_string()]);
    map.insert("M9".to_string(), vec!["M9".to_string(), "maj9".to_string(), "△9".to_string()]);
    map.insert("m_maj9".to_string(), vec!["m(maj9)".to_string(), "mM9".to_string(), "-M9".to_string()]);
    map.insert("sus2".to_string(), vec!["sus2".to_string()]);
    map.insert("5".to_string(), vec!["5".to_string()]);
    map.insert("8".to_string(), vec!["8".to_string()]);

    map
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_chord_name_aliases() {
        let aliases = get_chord_name_aliases_internal("Cmaj7");
        assert_eq!(aliases.len(), 3);
        assert!(aliases.contains(&"Cmaj7".to_string()));
        assert!(aliases.contains(&"CM7".to_string()));
        assert!(aliases.contains(&"C△7".to_string()));
    }

    #[test]
    fn test_get_chord_name_aliases_minor() {
        let aliases = get_chord_name_aliases_internal("Cm");
        assert_eq!(aliases.len(), 2);
        assert!(aliases.contains(&"Cm".to_string()));
        assert!(aliases.contains(&"C-".to_string()));
    }

    #[test]
    fn test_get_chord_name_aliases_unknown() {
        let aliases = get_chord_name_aliases_internal("Cxyz");
        assert_eq!(aliases.len(), 1);
        assert_eq!(aliases[0], "Cxyz");
    }
}
