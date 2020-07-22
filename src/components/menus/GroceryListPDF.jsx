import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
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
import Checkbox from "../../img/emptycheckbox.png";
import GroceryBorder from "../../img/groceryborder.png";
import Empty from "../../img/empty.png";

import { Container, Button, Card } from "semantic-ui-react";

const styles = StyleSheet.create({
  body: {
    letterSpacing: "0.5",
  },
  h1: {
    fontSize: 20,
    fontWeight: 800,
    marginBottom: "20px",
    color: "#21ba45",
  },
  cornerImage: {
    width: "500px",
  },
  bigItem: {
    marginBottom: "15px",
    marginRight: "15px",
    flexDirection: "row",
  },
  item: {
    flexDirection: "row",
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  itemContent: {
    flex: 1,
    fontSize: 11,
  },
  itemContentFor: {
    flex: 1,
    fontSize: 11,
    color: "grey",
    marginLeft: "20px",
  },
  checkbox: {
    marginRight: "10px",
    height: "20px",
  },
  pageBackground: {
    position: "absolute",
    minWidth: "100%",
    minHeight: "100%",
    display: "block",
    height: "100%",
    width: "100%",
  },
  container: {
    margin: "0 50px",
    padding: "25px",
    backgroundColor: "white",
    width: "70%",
    borderStyle: "solid",
    borderColor: "#21ba45",
    borderWidth: 5,
    borderRadius: 25,
    marginBottom: "50px",
    maxHeight: "90%",
  },
  empty: {
    height: "50px",
  },
});

// Create Document Component
const GroceryListPDF = () => {
  let history = useHistory();
  const [groceryList, setGroceryList] = useState(null);
  const location = useLocation();
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_MENUS_INDEX}${location.pathname.slice(
          6,
          -16
        )}`
      )
      .then((response) => {
        const apiList = response.data.groceryListText;
        setGroceryList(apiList);
      })
      .catch((error) => {
        console.log(error);
        // setSending(false);
        // Still need to handle errors
        // setErrorMessage(error.message);
      });
  }, []);

  if (!groceryList) {
    console.log("null");
    return null;
  } else {
    console.log("ready");

    let groceryListLines = groceryList.map((item) => {
      return (
        <View style={styles.bigItem}>
          <Image style={styles.checkbox} src={Checkbox} />
          <View>
            <View style={styles.item}>
              <Text style={styles.itemContent}>{item.main}</Text>
            </View>
            <View>
              <Text style={styles.itemContentFor}>{item.for}</Text>
            </View>
          </View>
        </View>
      );
    });

    const pdf = (
      <Document>
        <Page style={styles.body}>
          <Image src={GroceryBorder} style={styles.pageBackground} fixed />
          <Image src={Empty} style={styles.empty} fixed />

          <View style={styles.container}>
            <Text style={styles.h1}>Grocery List</Text>
            {groceryListLines}
          </View>
        </Page>
      </Document>
    );

    const openPDF = (url) => {
      window.open(url, "grocerylist");
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

export default GroceryListPDF;
