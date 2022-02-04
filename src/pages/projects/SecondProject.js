import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import tw from "tailwind-styled-components";
import Editor from "../../components/Editor";
import Editortwo from "../../components/Editortwo";

const SecondProject = () => {
  const [solutestate, setSoluteState] = useState("");
  const [solventstate, setSolventState] = useState("");
  const [textstate, settextstate] = useState("");
  const [fetchData, setFetchData] = useState("");
  const [fetchDatatwo, setFetchDatatwo] = useState("");

  const [Error, setError] = useState(null);

  let [researchpaper, setResearchpaper] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault(); // <-- prevent the default form action

    const formData = new FormData();
    formData.set("text_input", textstate); // <-- local component state
    console.log({ textstate });

    const formDatatwo = new FormData();
    formDatatwo.set("solute", solutestate); // <-- local component state
    formDatatwo.set("solvent", solventstate);

    fetch("https://tempflask-1.herokuapp.com/predict", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setFetchData(result.result);
      })
      .catch((err) => {
        setError(err.error);
        console.log(err);
      });

    fetch("https://flask-api-test1.herokuapp.com/predict", {
      method: "post",
      body: formDatatwo,
    })
      .then((res) => res.json())
      .then((result) => {
        setFetchDatatwo(result.result.predictions);
      })
      .catch((err) => {
        setError(err.error);
        console.log(err);
      });
  };

  useEffect(() => {
    getResearchpaper();
  }, []);

  let getResearchpaper = async () => {
    let response = await fetch("http://127.0.0.1:8000/researchpaper/2/");
    let data = await response.json();
    setResearchpaper(data);
  };

  return (
    <div>
      <Navbar transparent />
      <Header style={{ minHeight: "75vh" }}>
        <HeaderImage
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/practicaldev/image/fetch/s--aY8jKbxD--/c_imagga_scale,f_auto,fl_progressive,h_420,q_66,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/gfuvtuiovsav5i6313fs.gif')",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-75 bg-black"
          ></span>
        </HeaderImage>

        {/* Projects edit here */}
      </Header>
      <section className="relative py-16 bg-gray-300">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className=" px-4 mt-6">
                <h3 className="text-2xl font-semibold leading-normal text-gray-800 ">
                  Abstract
                </h3>
              </div>
              <div className="mt-5 py-5 border-t border-gray-300 ">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="flex mb-1 text-lg leading-relaxed text-gray-800 text-justify">
                      {researchpaper.abstract}
                    </p>
                  </div>
                </div>
              </div>

              <div className=" px-4 mt-6">
                <h3 className="text-2xl font-semibold leading-normal text-gray-800 ">
                  Methodology
                </h3>
              </div>
              <div className="mt-5 py-5 border-t border-gray-300 ">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="flex mb-1 text-lg leading-relaxed text-gray-800 text-justify">
                      {researchpaper.methodology}
                    </p>
                    <div className="flex justify-center">
                      <img
                        src={require("../../public/images/01.jpg").default}
                      />
                    </div>
                  </div>
                </div>

                <div className=" px-4 mt-6">
                  <h3 className="text-2xl font-semibold leading-normal text-gray-800 ">
                    Discussion
                  </h3>
                </div>
                <div className="mt-5 py-5 border-t border-gray-300 ">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="flex mb-1 text-lg leading-relaxed text-gray-800 text-justify">
                        {researchpaper.discussion}
                      </p>
                    </div>
                  </div>
                </div>

                <div className=" px-4 mt-6">
                  <h3 className="text-2xl font-semibold leading-normal text-gray-800 ">
                    System
                  </h3>
                </div>
                <div className="mt-5 py-5 border-t border-gray-300 ">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="flex mb-1 text-lg leading-relaxed text-gray-800 text-justify">
                        {researchpaper.system}
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" px-4 mt-6">
                  <h3 className="text-2xl font-semibold leading-normal text-gray-800 ">
                    Predictions
                  </h3>
                </div>
                <form noValidate onSubmit={onSubmit}>
                  <div className="mt-8 space-y-6">
                    <input
                      className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                      placeholder="Text_data"
                      onChange={(e) => settextstate(e.target.value)}
                    />

                    <button
                      className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                      type="submit"
                    >
                      SUBMIT
                    </button>
                    <input
                      className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                      type="text"
                      readOnly
                      value={fetchData}
                      name="OUTPUT"
                    />
                  </div>
                </form>
                {fetchData == 1 && (
                  <div>
                    <div className="flex flex-row">
                      <Editor {...{ setSoluteState }} />
                      <Editortwo {...{ setSolventState }} />
                    </div>

                    <form noValidate onSubmit={onSubmit}>
                      <div className="mt-8 space-y-6">
                        <input
                          className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                          placeholder="SOLUTE"
                          onChange={(e) => setSoluteState(e.target.value)}
                          value={solutestate}
                        />
                        <input
                          className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                          placeholder="SOLVENT"
                          onChange={(e) => setSolventState(e.target.value)} // <-- use correct state updater
                          value={solventstate}
                        />
                        <button
                          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                          type="submit"
                        >
                          SUBMIT
                        </button>
                        <input
                          className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                          type="text"
                          readOnly
                          value={fetchDatatwo + " " + "Kcal/mol"}
                          name="OUTPUT"
                        />
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecondProject;
const Header = tw.div`
    relative pt-16 pb-32 flex content-center items-center justify-center
    `;

const HeaderImage = tw.div`
    absolute top-0 w-full h-full bg-center bg-cover
    `;

const HeaderText = tw.div`
    container relative mx-auto
    `;

const HeaderText_one = tw.div`
    items-center flex flex-wrap
    `;

const HeaderText_two = tw.div`
    w-full lg:w-6/12 px-4 ml-auto mr-auto text-center
    `;

const HeaderTextMain = tw.div`
    text-white font-semibold text-5xl
    `;

const HeaderTextMain_child = tw.p`
    mt-4 text-lg text-gray-300
    `;

const Aboutus = tw.h1`
    w-full lg:w-6/12 px-4 ml-auto mr-auto text-center mb-4 font-semibold text-2xl
    
    `;

const AboutusText = tw.p`
    text-lg leading-relaxed m-4 text-gray-600
    `;
