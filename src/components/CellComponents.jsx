const CellComponets = ({ cell, selected, click }) => {
    return (
        <div
            className={["cell", cell.color, selected ? "selected" : ""].join(
                " "
            )}
            onClick={() => {
                click(cell);
            }}
        >
            {cell.available && !cell.figure && <div className={"available"} />}
            {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
        </div>
    );
};

export default CellComponets;
