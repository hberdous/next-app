import { MongoClient, ObjectId } from "mongodb";

const monogoUTL =
  "mongodb+srv://hberdous:Fzzmzhb82$@cluster0.w3vtf.mongodb.net/meetup?retryWrites=true&w=majority";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  const { image, title, address, description } = props.meetupData;
  return (
    <MeetupDetail
      image={image}
      title={title}
      address={address}
      description={description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(monogoUTL);
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  const params = meetups.map((meetup) => {
    return {
      params: {
        meetupId: meetup._id.toString(),
      },
    };
  });
  return {
    fallback: "blocking",
    paths: params,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(monogoUTL);
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();
  return {
    props: {
      meetupData: {
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      },
    },
    revalidate: 1,
  };
}

export default MeetupDetails;
