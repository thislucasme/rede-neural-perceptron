import { CartesianGrid, ReferenceLine, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
interface Props {
    points:{}[],
    pointClassifier:any
}
export const Chart = (props:Props) => {
    const referenceLineData = [{ x: 0, y: 0 }, { x: 100, y: 100 }]

    const redPoints = props.points.filter(point => props.pointClassifier(point) >= 0)
    const bluePoints = props.points.filter(point => props.pointClassifier(point) < 0)

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
                width={400}
                height={400}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <ReferenceLine segment={referenceLineData} stroke={"green"}/>
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="x" />
                <YAxis type="number" dataKey="y" name="y" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="red" data={redPoints} fill="#BB4A54" />
                <Scatter name="red" data={bluePoints} fill="#769FCE" />
            </ScatterChart>
        </ResponsiveContainer>
    )
}