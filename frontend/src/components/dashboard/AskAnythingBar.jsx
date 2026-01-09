import React from "react";
import {
    PaperAirplaneIcon,
    PlusIcon,
    ChevronDownIcon,
    RepoIcon,
    IssueOpenedIcon,
    CodeIcon,
    GitBranchIcon,
    GitPullRequestIcon,
    CloudIcon

} from "@primer/octicons-react";

import "./AskAnythingBar.css";

export default function AskAnythingBar() {
    return (
        <>
            <div className="ask-bar">

                <div className="ask-left">
                    <input
                        type="text"
                        className="ask-input"
                        placeholder="Ask anything"
                    />
                    <div className="ask-sub">
                     <span style={{ backgroundColor: "#0d1117" }}><PlusIcon size={14} style={{ backgroundColor: "#0d1117" }} /> Add repositories, files, and spaces</span>
                    </div>
                </div>


                <div className="ask-right">
                    <button className="model-btn">
                        GPT-5 mini <ChevronDownIcon size={14} style={{ backgroundColor: "#0d1117" }} />
                    </button>
                    <button className="send-btn">
                        <PaperAirplaneIcon size={16} style={{ backgroundColor: "#0d1117" }} />
                    </button>
                </div>
            </div>


            <div className="ask-actions">
                <button>
                    <CloudIcon style={{ backgroundColor: "#0d1117" }} /> Task <span className="new">New</span>
                </button>
                <button>
                    <IssueOpenedIcon style={{ backgroundColor: "#0d1117" }} /> Create issue
                </button>
                <button>
                    <CodeIcon style={{ backgroundColor: "#0d1117" }} /> Write code
                </button>
                <button>
                    <GitBranchIcon style={{ backgroundColor: "#0d1117" }} /> Git
                </button>
                <button>
                    <GitPullRequestIcon style={{ backgroundColor: "#0d1117" }} /> Pull requests
                </button>
            </div>

        </>
    );
}
