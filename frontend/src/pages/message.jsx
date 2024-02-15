export default function Message({ message, name, time, flag }) {
  return (
    <div className="flex items-start gap-2.5 ">
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-black">
            {name ? name : "John Doe"}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {time ? time : "12:00 PM"}
          </span>
        </div>
        <div
          className={`flex flex-col leading-1.5 p-4 border-gray-200 ${
            flag ? "bg-green-500" : "bg-gray-100"
          } rounded-e-xl rounded-es-xl ${
            flag ? "dark:bg-green-500" : "dark:bg-red-700"
          }`}
        >
          <p className="text-sm font-normal text-gray-900 dark:text-white">
            {message ? message : "Hello World"}
          </p>
        </div>
      </div>
    </div>
  );
}
