import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import dateformat from "dateformat";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer, PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import { Loading } from "../Loading";

import { Container, Button, Card, CardContent } from "semantic-ui-react";

// Create styles
const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  table: {
    display: "table",
    width: "auto",
    // borderStyle: "solid",
    // borderColor: "#bfbfbf",
    // borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    margin: "50px",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "30%",
    // borderStyle: "solid",
    // borderColor: "#bfbfbf",
    borderColor: "#21ba45",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
  tableDateColHeader: {
    width: "10%",
    // borderStyle: "solid",
    // borderColor: "#bfbfbf",
    borderColor: "#21ba45",
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: "30%",
    // borderStyle: "solid",
    // borderColor: "#bfbfbf",
    // borderWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#21ba45",
    // borderTopWidth: 0,
    padding: "5px 0",
  },
  tableDateCol: {
    width: "10%",
    // borderStyle: "solid",
    // borderColor: "#bfbfbf",
    // borderWidth: 1,
    // borderLeftWidth: 0,
    // borderTopWidth: 0,
    padding: "5px 0",
  },
  tableCellHeader: {
    margin: "auto",
    margin: 5,
    fontSize: 13,
    fontWeight: 500,
  },
  tableCell: {
    margin: "auto",
    margin: 5,
    fontSize: 11,
  },
});

// Create Document Component
const MenuPDF = () => {
  let history = useHistory();
  const [ready, setReady] = useState(false);
  const [menu, setMenu] = useState(null);
  const location = useLocation();
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_MENUS_INDEX}${location.pathname.slice(
          6,
          -4
        )}`
      )
      .then((response) => {
        // setSending(false);
        const apiMenuList = response.data;
        setMenu(apiMenuList);
        setReady(true);
      })
      .catch((error) => {
        console.log(error);
        // setSending(false);
        // Still need to handle errors
        // setErrorMessage(error.message);
      });
  }, []);

  if (!ready) {
    console.log("null");
    return null;
  } else {
    console.log("ready");

    const dates = [menu["startDate"]];
    for (let i = 1; i < 7; i++) {
      let day = new Date(menu["startDate"]);
      day.setDate(day.getDate() + i);
      dates.push(day.toISOString());
    }

    let menuLines = dates.map((day) => {
      return (
        <View style={styles.tableRow}>
          <View style={styles.tableDateCol}>
            <Text style={styles.tableCell}>{dateformat(day, "m/d ddd")}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>
              {menu["menu"][day]["breakfast"]}
            </Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{menu["menu"][day]["lunch"]}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{menu["menu"][day]["dinner"]}</Text>
          </View>
        </View>
      );
    });

    const pdf = (
      <Document>
        <Page style={styles.body} orientation="landscape">
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableDateColHeader}>
                <Text style={styles.tableCellHeader}>Date</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Breakfast</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Lunch</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Dinner</Text>
              </View>
            </View>
            {menuLines}
          </View>
        </Page>
      </Document>
    );

    const openPDF = (url) => {
      window.open(url, "_blank");
    };

    const onBackClick = () => {
      history.push(`/menus${location.pathname.slice(6, -4)}`);
    };

    return (
      <Container className="cont">
        <Card fluid className="main">
          <Card.Content>
            <h1>Enjoy your PDF!</h1>
            <PDFDownloadLink document={pdf} fileName="somename.pdf">
              {({ blob, url, loading, error }) =>
                loading ? <Loading /> : openPDF(url)
              }
            </PDFDownloadLink>
            <Button type="Reset" onClick={onBackClick}>
              Back
            </Button>
          </Card.Content>
        </Card>
      </Container>
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
