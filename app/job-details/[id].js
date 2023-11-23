import {
	Text,
	View,
	SafeAreaView,
	ActivityIndicator,
	RefreshControl,
	ScrollView,
} from "react-native";

import { Stack, useRouter, useGlobalSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import {
	Company,
	JobAbout,
	JobFooter,
	JobTabs,
	ScreenHeaderBtn,
	Specifics,
} from "../../components";

import { COLORS, SIZES, icons } from "../../constants";
import useFetch from "../../hooks/useFetch";

const tabs = ['About', 'Qualification', 'Responsibilities']

export default function JobDetails() {
	const { id } = useGlobalSearchParams();
	const router = useRouter();

	const { data, isLoading, error, refetch } = useFetch("job-details", {
		job_id: id,
		// extended_publisher_details: "false",
	});

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		refetch();
		setRefreshing(false);
	}, []);

    const [activeTab, setActiveTab] = useState(tabs[0]);

    function displayTabContent(){
        switch (activeTab) {
			case "Qualifications":
                return <Specifics title="Qualifications" points={data[0].job_highlights?.Qualifications ?? 'N/A'} />;
				break;
			case "About":
				return <Specifics title="About" points={data[0].job_highlights?.Qualifications ?? 'N/A'} />;
				break;
			case "Responsibilities":
				return (
					<Specifics
						title="Responsibilities"
						points={data[0].job_highlights?.Qualifications ?? 'N/A'}
					/>
				);
				break;
		}
    }


	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerBackVisible: false,
					headerLeft: () => {
						return (
							<ScreenHeaderBtn
								iconUrl={icons.left}
								dimension="60%"
								handlePress={() => router.back()}
							/>
						);
					},
					headerRight: () => {
						return (
							<ScreenHeaderBtn
								iconUrl={icons.right}
								dimension="60%"
							/>
						);
					},
					headerTitle: "",
				}}
			/>
			<>
				<ScrollView
					showsVerticalScrollIndictor={false}
					RefreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
				>
					{isLoading ? (
						<ActivityIndicator
							size="large"
							color={COLORS.primary}
						/>
					) : error ? (
						<Text>Something Went Wrong</Text>
					) : data.length === 0 ? (
						<Text>No Data</Text>
					) : (
						<View
							style={{
								padding: SIZES.medium,
								paddingBottom: 100,
							}}
						>
							<Company
								companyLogo={data[0].employee_logo}
								jobTitle={data[0].job_title}
								companyName={data[0].employee_name}
								location={data[0].job_country}
							/>
							<JobTabs
								tabs={tabs}
								activeTab={activeTab}
								setActiveTab={setActiveTab}
							/>
						</View>
					)}
					{displayTabContent()}
				</ScrollView>
			</>
		</SafeAreaView>
	);
}
