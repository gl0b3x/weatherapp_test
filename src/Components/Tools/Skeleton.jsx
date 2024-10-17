const Skeleton = ({ width, height, minHeight }) => {
  return (
    <div
      className="skeleton"
      style={{ width: width, height: height, minHeight: minHeight }}
    />
  );
};

export default Skeleton;
