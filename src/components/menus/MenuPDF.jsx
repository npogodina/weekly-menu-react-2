import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import dateformat from "dateformat";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Loading } from "../Loading";
import MenuBorder from "../../img/menuborder.png";

import { Container, Button, Card } from "semantic-ui-react";

// Create styles
const styles = StyleSheet.create({
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#21ba45",
    borderWidth: 5,
    padding: "15px",
    margin: "50px",
    marginTop: "100px",
    backgroundColor: "white",
    borderRadius: 25,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "30%",
    borderColor: "#21ba45",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
  tableDateColHeader: {
    width: "10%",
    borderColor: "#21ba45",
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: "30%",
    borderLeftWidth: 1,
    borderColor: "#21ba45",
    padding: "5px 0",
  },
  tableDateCol: {
    width: "10%",
    padding: "5px 0",
  },
  tableCellHeader: {
    margin: "auto",
    margin: 5,
    fontSize: 14,
    fontWeight: 500,
  },
  tableCell: {
    margin: "auto",
    margin: 5,
    fontSize: 12,
  },
  pageBackground: {
    position: "absolute",
    minWidth: "100%",
    minHeight: "100%",
    display: "block",
    height: "100%",
    width: "100%",
  },
});

// Create Document Component
const MenuPDF = () => {
  let history = useHistory();
  const [menu, setMenu] = useState(null);
  const [pdfURL, setPdfURL] = useState(null);
  const location = useLocation();

  useEffect(() => {
    openPDF(pdfURL);
  }, [pdfURL]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_MENUS_INDEX}${location.pathname.slice(
          6,
          -4
        )}`
      )
      .then((response) => {
        const apiMenuList = response.data;
        setMenu(apiMenuList);
      })
      .catch((error) => {
        console.log(error);
        // Still need to handle errors
        // setErrorMessage(error.message);
      });
  }, []);

  const generatingPDF = () => {
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
        <Page orientation="landscape">
          <Image src={MenuBorder} style={styles.pageBackground} />
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

    return pdf;
  };

  const openPDF = (url) => {
    if (!url) {
      return;
    }
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
          {menu && (
            <PDFDownloadLink document={generatingPDF()} fileName="menu.pdf">
              {({ blob, url, loading, error }) =>
                loading ? <Loading /> : setPdfURL(url)
              }
            </PDFDownloadLink>
          )}

          <Button type="Reset" onClick={onBackClick}>
            Back
          </Button>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default MenuPDF;
