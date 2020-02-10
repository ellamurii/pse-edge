import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar
} from "react-native";

import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks, common } from "../constants";

const { width } = Dimensions.get("window");

class Home extends Component {
  state = {
    active: common.tabs[0],
    categories: []
  };

  static navigationOptions = {
    headerShown: false
  };

  componentDidMount() {
    this.setState({ categories: this.props.categories });
  }

  handleTab = tab => {
    this.setState({ active: tab });
  };

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={[styles.tab, isActive ? styles.active : null]}
      >
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { navigation } = this.props;
    const { categories } = this.state;
    const tabs = common.tabs;

    return (
      <Block color="gray2">
        <StatusBar
          backgroundColor={theme.colors.primary}
          barStyle="light-content"
        />
        <Block backgroundColor={theme.colors.primary} flex={false} row center space="between" style={styles.header}>
          <Text h1 bold white>
            PSE Edge
          </Text>
        </Block>

        <Block flex={false} row style={styles.tabs}>
          {tabs.map(tab => this.renderTab(tab))}
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 2 }}
        >
          <Block flex={false} row space="between" style={styles.categories}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.name}
                onPress={() => navigation.navigate("Explore", { category })}
              >
                <Card center middle shadow style={styles.category}>
                  <Badge
                    margin={[0, 0, 15]}
                    size={50}
                    color={theme.colors.secondary}
                  >
                    <Image source={category.image} />
                  </Badge>
                  <Text center medium height={20}>
                    {category.name}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

Home.defaultProps = {
  categories: mocks.categories
};

export default Home;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingTop: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 1
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3
  },
  categories: {
    flexWrap: "wrap",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3.5
  },
  category: {
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
  }
});
