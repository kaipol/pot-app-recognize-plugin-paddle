async function recognize(_base64, lang, options) {
    const { utils } = options;
    const { run, cacheDir, pluginDir } = utils;

    let result = await run(`${pluginDir}/PaddleOCR-json.exe`, [
        "use_angle_cls=true",
        "cls=true",
        `--image_path=${cacheDir}/pot_screenshot_cut.png`,
        `--config_path=models/config_${lang}.txt`,
    ]);
    if (result.status === 0) {
        let out = result.stdout;
        out = out.split("OCR init completed.");
        out = out[1].trim();
        let json = JSON.parse(out);
        let target = "";
        for (let line of json.data) {
            target += `${line.text}\n`;
        }
        return target.trim();
    } else {
        throw Error(result.stderr);
    }
}