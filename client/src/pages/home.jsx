import Form from "../Components/Form";

const Home = () => {
  return (
    <div className="w-[60%] flex flex-col gap-4">
      <Form />
      <main className="w-full flex-1 bg-gray-50 shadow-md rounded-3xl p-8">
        <p>Here all the todos will be shown</p>
      </main>
    </div>
  );
};

export default Home;
