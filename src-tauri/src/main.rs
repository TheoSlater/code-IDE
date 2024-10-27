use std::process::Command;
use tauri::command;

#[command]
async fn execute_code(language: String, code: String) -> Result<String, String> {
    let temp_file_path = match language.as_str() {
        "python" => "temp_script.py",
        "javascript" => "temp_script.js",
        // Add more languages as needed
        _ => return Err("Unsupported language".into()),
    };

    // Save code to a temporary file
    std::fs::write(temp_file_path, code).map_err(|e| e.to_string())?;

    // Run the command based on the language
    let output = match language.as_str() {
        "python" => Command::new("python").arg(temp_file_path).output(),
        "javascript" => Command::new("node").arg(temp_file_path).output(),
        _ => return Err("Unsupported language".into()),
    }
    .map_err(|e| e.to_string())?;

    // Capture and return output or error
    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    let stderr = String::from_utf8_lossy(&output.stderr).to_string();

    if !stderr.is_empty() {
        Err(stderr)
    } else {
        Ok(stdout)
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![execute_code])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
