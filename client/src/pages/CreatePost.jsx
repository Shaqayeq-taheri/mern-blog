import { TextInput, Select, FileInput, Button } from 'flowbite-react'
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreatePost() {
  return (
      <div className="p-10 max-w-3xl mx-auto min-h-screen ">
          <h1 className="text-center text-3xl my-7 font-semibold">
              Create a post{" "}
          </h1>
          <form className="flex flex-col gap-4 mb-16 shadow-md rounded-sm p-10">
              <div className="flex flex-col gap-4 sm:flex-row justify-between">
                  <TextInput
                      type="text"
                      placeholder="Title"
                      required
                      id="title"
                      className="flex-1"
                  />
                  <Select>
                      <option value="uncategorized">Select a Category</option>
                      <option value="option 1">option1</option>
                      <option value="option 2">option2</option>
                      <option value="option 3">option3</option>
                  </Select>
              </div>
              <div className="flex gap-4 items-center justify-between border-4 border-teal-500  border-dotted p-3">
                  <FileInput type="file" accept="image/*" />
                  <Button
                      type="button"
                      gradientDuoTone="purpleToBlue"
                      outline
                      size="sm"
                  >
                      Uploade Image
                  </Button>
              </div>
              <ReactQuill
                  theme="snow"
                  placeholder="Write something..."
                  required
                  className=" h-60 mb-12"
              />
              <Button type="submit" gradientDuoTone="purpleToPink">
                  Publish
              </Button>
          </form>
      </div>
  );
}

export default CreatePost
