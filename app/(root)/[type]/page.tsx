import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { getFileType, getFileTypesParams } from "@/lib/utils";
import { AwardIcon } from "lucide-react";
import { Models } from "node-appwrite";
import React from "react";

const page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || " ";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";
  const types = getFileTypesParams(type) as FileType[];

  const files = await getFiles({ types: types , searchText, sort });

  return (
    <div className='page-container'>
      <section className='w-full'>
        <h1 className='h1 capitalize'>{type}</h1>
        <div className='total-size-section'>
          <p className='body-1'>
            Total: <span className='h5'>0 MB</span>
          </p>

          <div className='sort-container'>
            <p className='body-1 hidden sm:block text-light-200'>Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>
      {/* {Render the files} */}
      {files.total > 0 ? (
        <section className='file-list'>
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p>No Files Uploaded</p>
      )}
    </div>
  );
};

export default page;
