import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

const Main = () => {
  // Destructure context values for easier access
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main">
      {/* Navigation bar */}
      <div className="nav">
        <p>Gemini Clone...</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            {/* Greeting section */}
            <div className="greet">
              <p>
                <span>Hello, Tejas..</span>
              </p>
              <p className="shine">How Can I Help You Today</p>
            </div>

            {/* Cards with prompt suggestions */}
            <div className="cards">
              <div className="card">
                <p>Improve readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>

              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trips</p>
                <img src={assets.compass_icon} alt="" />
              </div>

              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>

              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            {/* Displaying the result */}
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />

              {loading ? (
                // Loading animation while waiting for the result
                <div
                  aria-label="Orange and tan hamster running in a metal wheel"
                  role="img"
                  className="wheel-and-hamster"
                >
                  <div className="wheel"></div>
                  <div className="hamster">
                    <div className="hamster__body">
                      <div className="hamster__head">
                        <div className="hamster__ear"></div>
                        <div className="hamster__eye"></div>
                        <div className="hamster__nose"></div>
                      </div>
                      <div className="hamster__limb hamster__limb--fr"></div>
                      <div className="hamster__limb hamster__limb--fl"></div>
                      <div className="hamster__limb hamster__limb--br"></div>
                      <div className="hamster__limb hamster__limb--bl"></div>
                      <div className="hamster__tail"></div>
                    </div>
                  </div>
                  <div className="spoke"></div>
                </div>
              ) : (
                // Display the result
                <p
                  dangerouslySetInnerHTML={{ __html: resultData }}
                  className="resultFont  content-container"
                ></p>
              )}
            </div>
          </div>
        )}

        {/* Input section for entering prompts */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>

          {/* Disclaimer about accuracy */}
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double check from your side
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
