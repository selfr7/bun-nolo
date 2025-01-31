import { NavLink, useNavigate, useParams } from "react-router-dom";
import React, { useCallback, useState } from "react";
import { Button, Toggle } from "ui";
import {
  setHasVersion,
  saveContentAndMdast,
  setShowAsMarkdown,
  updateContent,
  setSaveAsTemplate,
} from "./pageSlice";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { removeOne } from "database/dbSlice";
export const EditTool = ({ handleSave }) => {
  const { pageId } = useParams();
  const navigate = useNavigate();

  const pageState = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();
  const [isDeleting, setDeleting] = useState(false);

  const toggleShowAsMarkdown = (value) => {
    dispatch(setShowAsMarkdown(value));
  };
  const handleToggleTemplateChange = (value: boolean) => {
    dispatch(setSaveAsTemplate(value));
  };
  const saveAsTemplate = useAppSelector((state) => state.page.saveAsTemplate);

  const handleDelete = useCallback(async () => {
    setDeleting(true);
    try {
      // await deleteEntry({ entryId: pageId }).unwrap();
      dispatch(removeOne(pageId));

      // addToast('Page deleted successfully!');
      navigate("/life/notes");
      setDeleting(false);
    } catch (error) {
      console.error("Failed to delete the page:", error);
      //   addToast("Error deleting page. Please try again.");
    }
  }, [navigate, pageId]);

  return (
    <div className="flex items-center justify-between bg-gray-100 p-4">
      {/* <div className="text-gray-600">
        {pageState.createdTime} |{" "}
        {pageState.hasVersion ? "Versioned" : "Not Versioned"}
      </div> */}
      <Toggle
        label="Markdown 显示" // 简洁的标签
        id="markdown-toggle" // 唯一的 ID
        checked={pageState.showAsMarkdown}
        onChange={toggleShowAsMarkdown}
      />
      <Toggle
        id="save-as-template"
        label="保存为模板"
        checked={saveAsTemplate}
        onChange={handleToggleTemplateChange}
      />

      <Button onClick={handleSave} variant="primary" size="medium">
        Save
      </Button>
      <NavLink to={`/${pageId}`}>preview</NavLink>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className={`rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700 ${
          isDeleting ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};
