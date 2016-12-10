/* @flow */
'use strict';
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import _ from 'lodash';

const styles = StyleSheet.create({
  xAxisContainer: {
    flexDirection: 'row',
    flex: 0,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  axisText: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default class XAxis extends Component {

  static propTypes = {
    axisColor: PropTypes.any.isRequired,
    axisLabelColor: PropTypes.any.isRequired,
    axisLineWidth: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(PropTypes.array),
    showXAxisLabels: PropTypes.bool.isRequired,
    style: PropTypes.any,
    width: PropTypes.number.isRequired,
    align: PropTypes.string,
    labelFontSize: PropTypes.number.isRequired,
    xAxisTransform: PropTypes.func,
  };
  static defaultProps = {
    align: 'center',
  };

  render() {
    const data = this.props.data || [];
    const { daysInMonth } = this.props;
    let transform = (d) => d;
    if (this.props.xAxisTransform && typeof this.props.xAxisTransform === 'function') {
      transform = this.props.xAxisTransform;
    }
    return (
      <View
        style={[
          styles.xAxisContainer,
          {
            borderTopColor: this.props.axisColor,
            borderTopWidth: this.props.axisLineWidth,
            backgroundColor: this.props.xAxisColor,
            paddingLeft: this.props.innerPadding
          },
          this.props.style,
        ]}
      >
      {(() => {
        if (!this.props.showXAxisLabels) return null;
        return data.map((d, i) => {
          const item = transform(d[0]);

          if (typeof item !== 'number' && !item) return null;

          if((daysInMonth === 31 || daysInMonth === 29) && (i + 1) % 2 === 0) return null;
          if((daysInMonth === 30 || daysInMonth === 28) && (i + 1) % 2 !== 0) return null;

          return (
            <Text
              key={i}
              style={[
                styles.axisText,
                {
                  textAlign: this.props.align,
                  color: this.props.axisLabelColor,
                  fontSize: this.props.labelFontSize,
                },
              ]}
            >{i + 1}</Text>
        );
        });
      })()}
      {(() => {
        if(data.length < daysInMonth) {

          const daysDifference = daysInMonth - data.length;
          const fillUpArray = _.fill(Array(daysDifference), 0);
          return fillUpArray.map((item, i) => {

            if((daysInMonth === 31 || daysInMonth === 29) && (i + 1) % 2 === 0) return null;
            if((daysInMonth === 30 || daysInMonth === 28) && (i + 1) % 2 !== 0) return null;

            return <Text key={i} style={styles.axisText}></Text>;
          });
        }
      })()}
      </View>
    );
  }
}
