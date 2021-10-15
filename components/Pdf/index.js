import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import { Flex } from "@chakra-ui/react";

export default function Pdf({ item }) {
  // TODO centralize gateway stuff
  const gateway = "https://metanivek.mypinata.cloud/ipfs/";
  const uri = item.artifact_uri.replace("ipfs://", gateway);

  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }
  // TODO: handle pagination
  return (
    <Flex direction="column" align="center" justify="center" grow={1}>
      <Document
        options={{
          cMapUrl: "cmaps/",
          cMapPacked: true,
        }}
        onLoadSuccess={onDocumentLoadSuccess}
        file={uri}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </Flex>
  );
}
