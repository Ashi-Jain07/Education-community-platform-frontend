import Login from "./Login";

function Homepage() {
    return (
        <>
            <div className="lg:flex lg:justify-evenly text-center place-items-center">
                <div className="lg:w-1/3 w-2/3">
                    <h1 className="text-center text-4xl font-bold relative top-48">Welcome to ExpertBuddy</h1>
                    <p className="text-center text-2xl font-semibold mt-56"><i>Welcome to ExpertBuddy – a leading Edtech platform connecting students with top-notch tutors worldwide. Experience personalized learning and achieve success with expert guidance!</i></p>
                </div>
                <div>
                    <Login />
                </div>
            </div>
        </>
    )
};

export default Homepage;