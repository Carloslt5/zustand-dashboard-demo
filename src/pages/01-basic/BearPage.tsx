import { WhiteCard } from "../../components";
import { useBrearsStore } from "../../stores/bears/bears.store";

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        <BlackBears />

        <PolarBears />

        <PandaBears />

        <BearDisplay />
      </div>
    </>
  );
};

export const BlackBears = () => {
  const blackBears = useBrearsStore((state) => state.blackBears);
  const increaseBlackBears = useBrearsStore((state) => state.increaseBlackBears);

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increaseBlackBears(+1)}> +1</button>
        <span className="mx-2 text-3xl lg:mx-10"> {blackBears} </span>
        <button onClick={() => increaseBlackBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const PolarBears = () => {
  const polarBears = useBrearsStore((state) => state.polarBears);
  const increasePolarkBears = useBrearsStore((state) => state.increasePolarkBears);

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePolarkBears(+1)}> +1</button>
        <span className="mx-2 text-3xl lg:mx-10"> {polarBears} </span>
        <button onClick={() => increasePolarkBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const PandaBears = () => {
  const pandaBears = useBrearsStore((state) => state.pandaBears);
  const increasePandakBears = useBrearsStore((state) => state.increasePandakBears);

  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increasePandakBears(+1)}> +1</button>
        <span className="mx-2 text-3xl lg:mx-10"> {pandaBears} </span>
        <button onClick={() => increasePandakBears(+1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

export const BearDisplay = () => {
  const bears = useBrearsStore((state) => state.bears);
  const addBear = useBrearsStore((state) => state.addBear);
  const clearBear = useBrearsStore((state) => state.clearBear);

  return (
    <WhiteCard>
      <h2>Osos </h2>
      <button className="mb-2" onClick={addBear}>
        Add bear
      </button>
      <button onClick={clearBear}> Clear bear</button>

      <pre>{JSON.stringify(bears, null, 2)}</pre>
    </WhiteCard>
  );
};
