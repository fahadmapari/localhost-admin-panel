interface Props {
  label: string;
}

const PageHeading = ({ label }: Props) => {
  return <h1 className="text-3xl font-semibold ">{label}</h1>;
};

export default PageHeading;
