const LoaderAnimation = () => {
  return (
    <div class="flex justify-center items-center h-full">
      <div class="relative w-14 h-14 animate-spin rounded-full bg-gradient-to-r from-green-300 to-red-300">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gray-200 rounded-full border-2 border-white"></div>
      </div>
    </div>
  );
};

export default LoaderAnimation;
