import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer, PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const menu = (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

// Create Document Component
const MenuPDF = () => {
  const openPDF = (url) => {
    window.open(url, "_blank");
  };

  return (
    <PDFDownloadLink document={menu} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : openPDF(url)
      }
    </PDFDownloadLink>
  );
};

export default MenuPDF;

// return (
//   <div>
//     <PDFDownloadLink document={menu} fileName="somename.pdf">
//       {({ blob, url, loading, error }) =>
//         loading ? "Loading document..." : "Download now!"
//       }
//     </PDFDownloadLink>
//   </div>
// );

// import React, { useState } from "react";
// import { Document, Page } from "react-pdf";

// const MenuPDF = (props) => {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   function onDocumentLoadSuccess(document) {
//     setNumPages(document.numPages);
//   }

//   return (
//     <div>
//       <Document file="somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <p>
//         Page {pageNumber} of {numPages}
//       </p>
//     </div>
//   );
// };

// export default MenuPDF;
