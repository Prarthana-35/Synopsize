import React from "react";
import {useState} from 'react';
import axios from "axios";

function App(){
  const [ text, setText] = useState(0);
  const [summary, setSummary] = useState("");

  const handleInput = (e) => {
    setText(e.target.value);
  }

  const summarize = async() => {
    const options = {
      method: 'GET',
      url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
      params: {
        url: text,
        lang: 'en',
        engine: '2'
      },
      headers: {
        'x-rapidapi-key': '58e51ad4admshbcaefe682a1518ep1afbd6jsn6a7eac1655b0',
        'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);
    setSummary(response.data.summary);
  }

  return(
    <div className="text-gray-800 text-xl">
      <div className="h-screen w-screen bg-slate-300 flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold">Article Summarizer</h1>
        <div className="flex items-center justify-center gap-x-2">
          <input type="text" className="outline-none border-none rounded-lg px-5 w-100 h-10 my-5 mr-3" onChange={handleInput}/>
          <button className="bg-gray-700 text-white px-1 rounded-lg w-20 h-10" onClick={summarize}>Click</button>
        </div>

        <div className="w-96 h-64 bg-gray-400 overflow-x-hidden my-5 rounded flex">
          {summary}
        </div>
      </div>
    
  </div>
  );
}

export default App;