import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Sidepage from "./components/Sidepage";
import { DeleteSessionId, UpdateKnowledge } from "../api/auth";
import { showConsoleError } from "../util/ConsoleMessage";

const Main = () => {
  useEffect(() => {
    updateKnowledge();
    // allConversation();
    deleteSessionId();
  }, []);

  const updateKnowledge = async () => {
    await UpdateKnowledge("e2393f30-40ac-4c5b-9658-4c697053019f").catch(
      (error) => {
        if (error.code === "ERR_NETWORK") {
          showConsoleError(`----${error}`);
        } else {
          showConsoleError(error.data.error.data.error);
        }
      }
    );
  };

  // const allConversation = async () => {
  //   await AllConversationIds("Have you heard of Glauco?")
  //     .then((response) => {
  //       console.log(" Success:", response);
  //     })
  //     .catch((error) => {
  //       if (error.code === "ERR_NETWORK") {
  //         showConsoleError(`----${error}`);
  //       } else {
  //         showConsoleError(error?.data?.error?.data?.error || "Unknown error");
  //       }
  //     });
  // };

  const deleteSessionId = async () => {
    await DeleteSessionId("23030b6a-8321-497f-bb76-4edb26cabe65")
      .then((response) => {
        console.log(" Success:", response);
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          showConsoleError(`----${error}`);
        } else {
          showConsoleError(error?.data?.error?.data?.error || "Unknown error");
        }
      });
  };
  return (
    <div className="main-container">
      <Sidebar />
      <Sidepage />
    </div>
  );
};

export default Main;
