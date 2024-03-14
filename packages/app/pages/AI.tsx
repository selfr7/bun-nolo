import React from "react";
import { useGetEntriesQuery } from "database/services";

import { nolotusId } from "core/init";
import ChatAIList from "ai/blocks/ChatAIList";
import { chatAIOptions } from "ai/request";

const AI = () => {
  const { data, error, isLoading, isSuccess } = useGetEntriesQuery({
    userId: nolotusId,
    options: chatAIOptions,
  });
  console.log("data", data);
  return (
    <div className="container mx-auto ">
      <h2>对话AIs</h2>

      <ChatAIList />
    </div>
  );
};
export default AI;
