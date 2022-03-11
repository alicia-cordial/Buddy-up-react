import React, { useContext, useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { Title } from "react-native-paper";
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";
import BlocExperience from "../../components/BlocExperience";
import BlocInterest from "../../components/BlocInterest";
import FormModal from "../../components/FormModal";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import UpdateEvent from '../../components/UpdateEvent';
import Experience from "../Experience";
import { genericFetch } from "../../api/fetchApi";
import { genericFetchWithToken } from "../../api/fetchApiWithToken";

function Profile({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState("");
  const [experiences, setExperiences] = useState([]);

  const getData = () => {
    try {
      AsyncStorage.getItem("token").then((value) => {
        if (value != null) {
          setToken(value);
          console.log("valeur feed screen:", value);
          // navigation.navigate("Protected");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchUser();
  }, [token]);

  const deleteId = (id, interestLength) => {
    if (interestLength != 0) {
      genericFetchWithToken(`${API_URL}/experiences/${id}`, "PUT", token);
      fetchUser();
      console.log("expérience archivée !");
    }

    if (interestLength == 0) {
      genericFetchWithToken(`${API_URL}/experiences/${id}`, "DELETE", token);
      fetchUser();
      console.log("expérience supprimée !");
    }
  };

  console.log(user);
  return isLoading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text> Loading ... </Text>{" "}
    </View>
  ) : (
    <Tabs style={{ backgroundColor: "white" }}>
      <TabScreen label="Experiences">
        <AllExperiences
          user={user}
          navigation={navigation}
          deleteId={(id, interestLength) => {
            deleteId(id, interestLength);
            fetchUser();
          }}
        />
      </TabScreen>

      <TabScreen label="Interactions">
        <AllInteractions user={user} navigation={navigation} />
      </TabScreen>

      <TabScreen label="Profil">
        <UserProfileInfos user={user} navigation={navigation} />
      </TabScreen>
    </Tabs>
  );
}

function AllExperiences({ navigation, user, deleteId }) {
  const goTo = useTabNavigation();
  const index = useTabIndex();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Title style={{ textAlign: "center", paddingTop: 10 }}>
        ALL EXPERIENCES
      </Title>

      <ScrollView>
        <View>
          {user.experiences &&
            user.experiences.map((experience) => (
              <>
                <BlocExperience
                  navigation={navigation}
                  experience={experience}
                  user={user}
                />
                {/* <UpdateEvent/> */}
                <Text
                  onClick={() =>
                    deleteId(experience.id, experience.interests.length)
                  }
                  key={experience.id}
                >
                  <Image
                    style={{ width: 25, height: 25 }}
                    source={require("../../../assets/trashcan.png")}
                  />
                </Text>
              </>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

function AllInteractions({ navigation, user }) {
  const goTo = useTabNavigation();
  const index = useTabIndex();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Title style={{ textAlign: "center", paddingTop: 10 }}>
        ALL INTERACTIONS
      </Title>

      <ScrollView>
        <View>
          {user.experiences &&
            user.experiences.map((experience) =>
              experience.interests.map((interest) => (
                <>
                  <BlocInterest
                    navigation={navigation}
                    key={interest.id}
                    interest={interest}
                    experience={experience}
                    user={user}
                  />
                  <Text>id = {interest.id}</Text>
                  <Text>message = {interest.message}</Text>
                  <Text>date = {interest.date}</Text>
                </>
              ))
            )}
        </View>
      </ScrollView>
    </View>
  );
}

function UserProfileInfos({ navigation, user }) {
  const goTo = useTabNavigation();
  const index = useTabIndex();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Title style={{ textAlign: "center", paddingTop: 10 }}>
        PROFILE INFOS
      </Title>

      <View>
        <View>
          <Image
            style={{ width: 50, height: 50 }}
            source={require("../../../assets/profil.png")}
          />

          <View>
            <Text>id {user.id} </Text>
            <Text>Login {user.login} </Text>
            <Text>Date d'inscription {user.created_at} </Text>
          </View>
        </View>

        <View>
          <Text>
            {" "}
            <Image source={require("../../../assets/ok.png")} /> Vérifications
            gmail, facebook, téléphone
          </Text>
        </View>

        <View>
          <FormModal />
        </View>
      </View>
    </View>
  );
}

export default Profile;
