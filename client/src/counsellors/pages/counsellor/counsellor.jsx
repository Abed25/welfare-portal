import React, { useState } from "react";
import "../../styles/counsellor.css";
import DynamicButton from "../../components/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronDown,
  faCircleChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

export default function Counsellor() {
  const [expandedItems, setExpandedItems] = useState({}); // Stores which items are expanded

  const handleView = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the clicked item only
    }));
  };

  const fakeMaps = [1, 2, 3, 4];

  const buttonStyle = {
    position: "absolute",
    top: "10px",
    right: "40px",
  };

  return (
    <div className="containerCounsellor">
      <DynamicButton
        name="Feeds"
        notify={true}
        value={0}
        style={{ ...buttonStyle, right: "150px" }}
      />
      <DynamicButton
        name="Request"
        style={buttonStyle}
        notify={true}
        click={() => alert("Request")}
        value={4}
      />
      <h2 style={{ textAlign: "center" }}>Student Requests</h2>

      {fakeMaps.map((_, id) => (
        <div
          key={id}
          className={
            expandedItems[id] ? "studentRequestV2" : "studentRequestV1"
          }
        >
          <FontAwesomeIcon
            className="dropDown"
            icon={expandedItems[id] ? faCircleChevronUp : faCircleChevronDown}
            onClick={() => handleView(id)}
          />
          <h4>Title: Lost phone</h4>
          <p>
            ipsum dolor sit amet consectetur adipisicing elit. Iusto vel
            repellat harum architecto eveniet, nemo similique obcaecati commodi
            aliquid dignissimos dolorum ducimus quas corrupti quisquam
            consequuntur culpa in aliquam neque. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Iusto vel repellat harum architecto
            eveniet, nemo similique obcaecati commodi aliquid dignissimos
            dolorum ducimus quas corrupti quisquam consequuntur culpa in aliquam
            neque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Iusto vel repellat harum architecto eveniet, nemo similique
            obcaecati commodi aliquid dignissimos dolorum ducimus quas corrupti
            quisquam consequuntur culpa in aliquam neque. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Iusto vel repellat harum
            architecto eveniet, nemo similique obcaecati commodi aliquid
            dignissimos dolorum ducimus quas corrupti quisquam consequuntur
            culpa in aliquam neque.
          </p>
          <div className="respondContainer">
            <form className="response">
              <p> Give a response:</p>
              <textarea></textarea>
              <DynamicButton
                name="Send"
                style={{
                  margin: "10px auto",
                  width: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
