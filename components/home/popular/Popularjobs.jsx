import { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";

export default function Popularjobs() {
	const router = useRouter();

	const isLoading = false;
	const error = false;

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Popular Jobs</Text>
				<TouchableOpacity>
					<Text style={styles.headerBtn}>Show All</Text>
				</TouchableOpacity>

				<View style={styles.cardsContainer}>
					{isLoading ? (
						<ActivityIndicator
							size="large"
							colors={COLORS.primary}
						/>
					) : error ? (
						<Text>Something went wrong</Text>
					) : (
						<FlatList
							data={[1, 2, 3, 4, 5, 5, 598, 3, 5]}
							renderItem={({item}) => (
								<PopularJobCard item={item} />
							)}
							keyExtractor={(item) => item?.job_card}
              contentContainerStyle={{columnGap: SIZES.medium}}
              horizontal
						/>
					)}
				</View>
			</View>
		</View>
	);
}
