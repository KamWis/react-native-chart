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

          if((i + 1) % 3 !== 1) return null;

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
        const { daysInMonth } = this.props;
        if(data.length < daysInMonth) {

          const daysDifference = daysInMonth - data.length;
          const fillUpArray = _.fill(Array(daysDifference), 0);
          return fillUpArray.map((item, i) => {
            if((i + 1) % 3 !== 1) return null;
            return <Text key={i} style={styles.axisText}></Text>;
          });
        }
      })()}
      </View>
    );
  }
}
