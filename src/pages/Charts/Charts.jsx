import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Navbar from "../../components/Navbar";
import BackgroundImage from "../Home/BackgroundImage.jpg";
import { getFirestore, collection, query, where, getDoc, setDoc, doc } from 'firebase/firestore'; // Importing necessary Firestore functions
import { firestore } from "../../Firebase";
import { getAuth } from "firebase/auth";

const Charts = () => {
    const auth = getAuth()
    const user = auth.currentUser
    const getData = async () => {
        const d = await getDoc(doc(firestore, "feedback", user.uid))
        console.log(d.data().feedbackJSON)
        return {
            Clarity: d.data().feedbackJSON.clarity,
            Score: d.data().feedbackJSON.score
        }
    }

    const data = [
    { Clarity: 10, Score: 80 },
    { Clarity: 15, Score: 70 },
    { Clarity: 20, Score: 100 },
    ];
    data.push(getData())
    data.sort()
    console.log(data)

  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "100% 100%",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          margin: 0,
          padding: 0,
          zIndex: -1,
        }}
      >
        <div className="container mx-auto w-[75rem]">
          {/* Set background color to white */}
          <LineChart
            width={900}
            height={900}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Clarity" style={{ fontSize: "1.25rem", stroke: "black" }} />
            <YAxis style={{ stroke: "black" }} />
            <Tooltip />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="top"
              wrapperStyle={{
                top: "10px",
                right: "10px",
                lineHeight: "30px",
                fontSize: "1.5rem",
                padding: "10px",
              }}
            />
            <Line type="monotone" dataKey="Score" stroke="green" strokeWidth={3} />
          </LineChart>
        </div>
      </div>
    </>
  );
};

export default Charts;
