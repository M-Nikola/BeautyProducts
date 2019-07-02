import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from "react-native-modal";

import TextButton from '../../../common/simple/Buttons/TextButton';
import ExpandableFilters from './ExpandableFilters';
import { colors, fontSize, spacing, strings } from '../../../../utils/constants';

class Filters extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
            visible: false,
            sortBy: props.sortBy
        }
    }

    setModalVisible(visible) {
        this.setState({ visible: visible, sortBy: this.props.sortBy });
    }

    resetFilters = () => {
        this.expandableFilters.reset();
        this.props.resetFilters();
        this.setState({ sortBy: this.props.sortOptions[0] });
    }

    selectSort = (key) => {
        this.setState({ sortBy: key });
    }

    applyFilters = () => {
        this.props.applyFilters(this.expandableFilters.state.filters, this.state.sortBy);
        this.setModalVisible(false);
    }

    render() {
        return (
            <Modal
                isVisible={this.state.visible}
                onBackdropPress={() => this.setModalVisible(false)}
                onBackButtonPress={() => this.setModalVisible(false)}
                style={styles.modal}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TextButton
                            style={styles.cancelButton}
                            text={strings.cancel}
                            onPress={() => this.setModalVisible(false)}
                        />  

                        <Text style={styles.title}>
                            {strings.filters}
                        </Text>

                        <TextButton
                            style={styles.resetButton}
                            text={strings.reset}
                            onPress={this.resetFilters}
                        />
                    </View>
                    
                    <View style={styles.sortContainer}>
                        <Text style={styles.subTitle}>
                            {strings.sortBy}
                        </Text>
                        
                        <View style={styles.sortButtonContainer}>
                            {
                                this.props.sortOptions.map((item, index) => (
                                    <TextButton
                                        key={index}
                                        style={[styles.sortButton, 
                                            { 
                                                backgroundColor: this.state.sortBy === item ? 
                                                    colors.lightGray : 
                                                    colors.extraLightGray 
                                            }
                                        ]}
                                        textStyle={{ color: colors.gray }}
                                        text={item.value}
                                        onPress={() => this.selectSort(item)}
                                    />  
                                ))
                            }
                        </View>
                    </View>

                    <View style={styles.filterContainer}>
                        <Text style={styles.subTitle}>
                            {strings.filterBy}
                        </Text>
                        
                        <ExpandableFilters
                            ref={ref => this.expandableFilters = ref}
                            filters={this.props.filters}
                            previousFilters={this.props.previousFilters}
                        />
                    </View>

                    <TextButton 
                        style={styles.applyButton}
                        textStyle={styles.applyButtonText}
                        text={strings.applyFilters}
                        onPress={this.applyFilters}
                    />
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    container: {
        height: '66%',
        width: '100%',
        backgroundColor: colors.white,
        padding: spacing.extraBig,
        paddingTop: spacing.small
    },
    header: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    title: {
        color: colors.darkGray, 
        fontSize: fontSize.big,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
    cancelButton: {
        paddingLeft: 0,
        height: 40
    },
    resetButton: {
        paddingRight: 0,
        height: 40
    },
    sortContainer: {

    },
    subTitle: {
        color: colors.darkGray, 
        fontSize: fontSize.big,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    },
    sortButtonContainer: {
        flexWrap: 'wrap', 
        flexDirection: 'row'
    },
    sortButton: { 
        height: 25,
        padding: spacing.medium,
        marginTop: spacing.medium,
        marginRight: spacing.medium,
        backgroundColor: colors.extraLightGray, 
        borderRadius: spacing.small
    },
    filterContainer: {
        flex: 1,
        marginTop: spacing.big
    },
    applyButton: {
        width: '100%',
        height: 45,
        marginTop: spacing.big,
        backgroundColor: colors.darkGray
    },
    applyButtonText: {
        color: colors.extraLightGray,
        fontSize: fontSize.big
    },
});

export default Filters;