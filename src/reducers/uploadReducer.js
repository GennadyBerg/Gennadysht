import { resolveComponentProps } from '@mui/base';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
var FormData = require('form-data');

const prepareHeaders = (headers, { getState }) => {
  const token = getState().auth.token;
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
    headers.set("Content-Type", "multipart/form-data");
  }
  return headers;
}

const uploadAPI = createApi({
  reducerPath: 'uploadAPI',
  baseQuery: fetchBaseQuery(
    {
      baseUrl: "http://shop-roles.node.ed.asmer.org.ua/",
      prepareHeaders
    }),
  endpoints: (builder) => ({
    uploadSingleFile: builder.mutation({
      async query(file) {
        var formData = new FormData();
        let fileData = await file.data.arrayBuffer();
        formData.append('photo', fileData);
        /*var reader = new FileReader();
        const readFile = (event) => event.target.result; 
        reader.addEventListener("loadend", readFile);
        reader.readAsBinaryString(file.data);
            <input type="file" name="photo" id='photo' value={file.url} />
        let form = (
          <form action="/upload" method="post" enctype="multipart/form-data" id='form'>
            <input type="number" name="photo1" id='photo1' value={5} />
          </form>
        );
        */

        let res =
        {
          action:"/upload",
          //url: 'upload',
          method: 'POST',
          credentials: 'include',
          body: formData,
        };
        return res;
      },
    }),
  }),
});

export const { useUploadSingleFileMutation } = uploadAPI;
export { uploadAPI }