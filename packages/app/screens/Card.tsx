// Card.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Avatar from "../../ui/screens/Avatar";
const Card = ({ title, imageUri, userName, avatarUri }) => {
	return (
		<View style={styles.card}>
			<Image source={{ uri: imageUri }} style={styles.cardImage} />
			<Text style={styles.cardTitle}>{title}</Text>
			<View style={styles.userInfo}>
				<Avatar uri={avatarUri} />
				<Text style={styles.userName}>{userName}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		width: "48%",
		backgroundColor: "#fff",
		borderRadius: 8,
		marginBottom: 16,
		overflow: "hidden",
	},
	cardImage: {
		width: "100%",
		height: 150,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: "bold",
		padding: 8,
	},
	userInfo: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 8,
		paddingBottom: 8,
	},

	userName: {
		fontSize: 16,
	},
});

export default Card;
