import Fuse from "fuse.js";
import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    createTextColumn,
    DataSheetGrid,
    intColumn,
    keyColumn,
    textColumn,
} from "react-datasheet-grid";

import "react-datasheet-grid/dist/style.css";

const PACKINTYPES = [];
const PRODUCTNAMES = [];

const Grid = () => {
    const [data, setData] = useState([{}, {}, {}]);

    useEffect(() => {
        // console.log(`final data`);
        // console.log(data);
    }, [data]);

    function onColumnChange(newValue, operations) {
        for (const operation of operations) {
            // console.log(`operations`);
            // console.log(operation);
        }
        setData(newValue);
    }

    const columns = [
        {
            ...keyColumn("quantity", intColumn),
            title: "Quantity",
        },
        {
            component: PackingAutoFill,
            keepFocus: true,
            title: "Packing Type",
            onColumnChange: onColumnChange,
        },
        // {
        //     component: NameAutoFill,
        //     keepFocus: true,
        //     title: "Product Name",
        //     onColumnChange: onColumnChange,
        // },
        {
            ...keyColumn("price", intColumn),
            title: "Price",
        },
        {
            ...keyColumn("total", intColumn),
            disabled: true,
            title: "Total Ammount",
        },
    ];

    return (
        <React.Fragment>
            <DataSheetGrid
                disableExpandSelection
                value={data}
                height={500}
                onChange={(newValue, operations) =>
                    onColumnChange(newValue, operations)
                }
                columns={columns}
            />
        </React.Fragment>
    );
};
const PackingAutoFill = ({
    focus,
    active,
    stopEditing,
    rowData,
    setRowData,
    onColumnChange,
}) => {
    const [showInput, setShowinput] = useState(true);
    const [text, setText] = useState("");

    const ref = useRef();

    useEffect(() => {
        if (active) {
            setShowinput(true);
            ref.current.focus();
        } else {
            setShowinput(false);
        }
        // if (focus) setShowinput(true);
    }, [focus, active]);

    function handleInput(e) {
        const TYPE = ["DOZEN", "PACKET", "CARD", "DABA", "GURS", "PIECE"];
        // const TYPE = PACKINTYPES;

        const options = {
            includeScore: true,
        };

        let value = e.target.value;

        const fuse = new Fuse(TYPE, options);

        const result = fuse.search(value);
        console.log(`result`);
        console.log(result);

        if (result.length > 0) {
            // console.log(`From Auto Fil`);
            // console.log(rowData);
            // console.log(onColumnChange);
            rowData.package_type = result[0].item;
            console.log(result[0].item);
            setText(result[0].item);
        }
    }

    return (
        <React.Fragment>
            {
                <input
                    style={{
                        display: showInput ? "block" : "none",
                        borderColor: "white",
                    }}
                    ref={ref}
                    type="text"
                    onChange={(e) => handleInput(e)}
                />
            }
            {
                <div style={{ display: !showInput ? "block" : "none" }}>
                    {text}
                </div>
            }
        </React.Fragment>
    );
};

// const NameAutoFill = ({
//     focus,
//     active,
//     stopEditing,
//     rowData,
//     setRowData,
//     onColumnChange,
// }) => {
//     const [showInput, setShowinput] = useState(true);
//     const [text, setText] = useState("");

//     const ref = useRef();

//     useEffect(() => {
//         if (active) {
//             setShowinput(true);
//             ref.current.focus();
//         } else {
//             setShowinput(false);
//         }
//         // if (focus) setShowinput(true);
//     }, [focus, active]);

//     function handleInput(e) {
//         // const ITEMS = [
//         //   'CHORI',
//         //   'METAL CHUTKI',
//         //   'SET',
//         //   'HAIR BAND',
//         //   'PONI',
//         //   'PIN',
//         //   'GALA PATI',
//         //   'MALA',
//         //   'TOPAS',
//         //   'RING',
//         //   'KANTA',
//         //   'KARA',
//         //   'BINDIA',
//         //   'CHAIN',
//         //   'CLIP',
//         //   'BALI',
//         //   'BRACLET',
//         //   'LOKIT CHAIN',
//         //   'DORI',
//         //   'MATHA PATI',
//         //   'HAIR BAND',
//         //   'TAWAL PONI',
//         //   'PONI GIFT',
//         //   'PIN',
//         // ];

//         const ITEMS = PRODUCTNAMES;

//         const options = {
//             includeScore: true,
//             minMatchCharLength: 1,
//             threshold: 0.5,
//         };

//         let value = e.target.value;

//         const fuse = new Fuse(ITEMS, options);

//         const result = fuse.search(value);
//         console.log(`result`);
//         console.table(result);

//         if (result.length > 0) {
//             // console.log(`From Auto Fil`);
//             // console.log(rowData);
//             // console.log(onColumnChange);
//             rowData.name = result[0].item;
//             // console.log(result[0].item);
//             setText(result[0].item);
//         }
//     }

//     return (
//         <React.Fragment>
//             {
//                 <input
//                     style={{
//                         display: showInput ? "block" : "none",
//                         borderColor: "white",
//                     }}
//                     ref={ref}
//                     type="text"
//                     onChange={(e) => handleInput(e)}
//                 />
//             }
//             {
//                 <div style={{ display: !showInput ? "block" : "none" }}>
//                     {text}
//                 </div>
//             }
//         </React.Fragment>
//     );
// };
export default Grid;
