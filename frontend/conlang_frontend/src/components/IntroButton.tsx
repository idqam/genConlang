/* eslint-disable @typescript-eslint/no-unused-vars */
type ButtonFields = {
  svg?: string;
  text: string;
};

export const IntroButton = ({ svg, text }: ButtonFields) => {
  return (
    <div className="transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-2xl border-2 border-white bg-gradient-to-b from-gray-800 to-gray-700 p-3 rounded-md shadow-md hover:from-gray-600 hover:to-gray-500">
      <p className="text-white text-xl">{text}</p>
    </div>
  );
};
