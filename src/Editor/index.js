import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools";
import axios from "axios";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import GetAppIcon from "@material-ui/icons/GetApp";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "@material-ui/core";

import { CodingSection, Controls, EditorContainer } from "./EditorElements";

function Editor() {
  const [code, setCode] = useState("");
  const [rand, setRand] = useState(0);
  const [ratio, setRatio] = useState(45);
  const [fontSize, setFontSize] = useState(14);
  const [darkMode, setDarkMode] = useState({
    dark: true,
  });
  const [theme, setTheme] = useState(
    `${!darkMode.dark ? "kuroir" : "solarized_dark"}`
  );

  const compile = async () => {
    let val = { value: code.replace(/\n/g, "") };
    console.log(val);

    await axios
      .post("http://localhost:8000/code", val, {})
      .then((res) => console.log(res.statusText))
      .catch((err) => console.log("Error", err));

    setRand(rand + 1);
    await axios.get("http://localhost:8000/code", {});
  };

  const onChange = (newCode) => {
    setCode(newCode);
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);

    element.download = "download.txt";
    document.body.appendChild(element);
    element.click();
  };

  const updateSlider = (val) => {
    setRatio(val);
    console.log(val);
  };

  const handleDarkMode = (event) => {
    setDarkMode({ ...darkMode, [event.target.name]: event.target.checked });
    if (darkMode.dark) {
      setTheme("kuroir");
    } else {
      setTheme("solarized_dark");
    }
  };

  return (
    <EditorContainer className={`${darkMode.dark ? "dark" : ""}`}>
      <h2>HTML Code Editor</h2>
      <Controls className={`${darkMode.dark ? "dark" : ""}`}>
        <div className="control-right">
          <div className="control-r-right">
            <FormControl className="fontSizeSelect">
              <InputLabel>Font-size</InputLabel>
              <Select
                value={fontSize}
                onChange={(event) => setFontSize(event.target.value)}
              >
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={22}>22</MenuItem>
                <MenuItem value={24}>24</MenuItem>
                <MenuItem value={28}>28</MenuItem>
                <MenuItem value={32}>32</MenuItem>
                <MenuItem value={36}>36</MenuItem>
                <MenuItem value={42}>42</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
            <FormControl className="themeSelect">
              <InputLabel>Theme</InputLabel>
              <Select
                value={theme}
                onChange={(event) => setTheme(event.target.value)}
              >
                <MenuItem value={"kuroir"}>kuroir</MenuItem>
                <MenuItem value={"monokai"}>monokai</MenuItem>
                <MenuItem value={"github"}>github</MenuItem>
                <MenuItem value={"tomorrow"}>tomorrow</MenuItem>
                <MenuItem value={"twilight"}>twilight</MenuItem>
                <MenuItem value={"xcode"}>xcode</MenuItem>
                <MenuItem value={"textmate"}>textmate</MenuItem>
                <MenuItem value={"solarized_dark"}>solarized_dark</MenuItem>
                <MenuItem value={"solarized_light"}>solarized_light</MenuItem>
                <MenuItem value={"terminal"}>terminal</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode.dark}
                  onChange={handleDarkMode}
                  color="primary"
                  name="dark"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              }
              label="Dark Mode"
            />
          </div>
          <Button onClick={compile}>
            Run
            <DirectionsRunIcon />
          </Button>
        </div>
        <Button onClick={downloadCode}>
          Download
          <GetAppIcon />
        </Button>
      </Controls>

      <Slider className="slider" onChange={updateSlider} defaultValue={45} />

      <CodingSection>
        <AceEditor
          className="editor"
          fontSize={fontSize}
          style={{ width: `${ratio}%`, height: "85vh" }}
          mode="html"
          theme={theme}
          onChange={onChange}
          width="auto"
          placeholder={"Start coding"}
          value={code}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
        />
        <iframe
          className="frame"
          key={rand}
          style={{
            width: `${100 - ratio}%`,
            height: "85vh",
            background: "white",
          }}
          src="http://localhost:8000/"
        ></iframe>
      </CodingSection>
    </EditorContainer>
  );
}

export default Editor;
