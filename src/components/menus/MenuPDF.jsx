import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";

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

// Create Document Component
const MenuPDF = (props) => {
  const [ready, setReady] = useState(false);

  const [menu, setMenu] = useState(null);
  const location = useLocation();
  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_API_MENUS_INDEX}${location.pathname.slice(
  //         6,
  //         -4
  //       )}`
  //     )
  //     .then((response) => {
  //       // setSending(false);
  //       const apiMenuList = response.data;
  //       setMenu(apiMenuList);
  //       // setReady(true);
  //     })
  //     .catch((error) => {
  //       // setSending(false);
  //       // Still need to handle errors
  //       // setErrorMessage(error.message);
  //     });
  // }, []);

  // this is hacky but helps set the render to the back of event queue https://github.com/diegomura/react-pdf/issues/420
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 0);
  }, []);

  // const pdf = null;
  // if (ready) {
  const pdf = (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{props.dishList[0].name}</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
  // }

  const openPDF = (url) => {
    window.open(url, "_blank");
  };

  if (!ready) {
    return null;
  } else {
    return (
      <div>
        <PDFDownloadLink document={pdf} fileName="somename.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : openPDF(url)
          }
        </PDFDownloadLink>
      </div>
    );
  }
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
