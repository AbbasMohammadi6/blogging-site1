import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

export default function Home() {
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    console.log(editorContent);
  }, [editorContent]);

  return (
    <>
      <SunEditor
        defaultValue='<div><p>some <span style="background: yellow">text</span></p><h1 style="color: palevioletred">heading</h1></div>'
        placeholder="Please type here..."
        autoFocus={true}
        setOptions={{
          height: 200,
          buttonList: buttonList.complex, // Or Array of button list, eg. [['font', 'align'], ['image']]
          // Other option
        }}
        onChange={(content) => setEditorContent(content)}
      />
    </>
  );
}
