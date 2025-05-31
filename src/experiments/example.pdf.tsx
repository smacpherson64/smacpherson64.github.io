import React from "react";
import { Document, Page, Text, View } from "../components/PDF.tsx";

export default function App() {
  return (
    <Document>
      <Page size="LETTER" orientation="landscape" dpi={300}>
        <View className="flex flex-1 flex-row items-stretch h-full w-full gap-4 p-8">
          <Card />
          <Card />
          <Card />
        </View>
      </Page>
    </Document>
  );
}

function Card() {
  return (
    <View className="border-2 border-gray-200 flex-1 flex gap-2 max-w-1/3 text-xs p-[2px]">
      <View className="font-bold p-2 bg-gray-200 text-lg leading-none">
        <Text>Your turn</Text>
      </View>

      <View className="flex flex-col gap-1 w-full px-2">
        <ListItem marker="1.">
          <Text>Gather energy</Text>
        </ListItem>

        <ListItem marker="2.">
          <Text>Perform actions (until out of energy)</Text>
        </ListItem>

        <View className="ml-4 flex flex-col gap-1 w-full px-2">
          <ListItem>
            <Text>Move (then handle events)</Text>
          </ListItem>
          <ListItem>
            <Text>Use a goal card</Text>
          </ListItem>
        </View>

        <View className="ml-4 flex flex-col gap-1 w-full px-2">
          <ListItem>
            <Text>Request a mission</Text>
          </ListItem>
          <ListItem>
            <Text>Gather resources</Text>
          </ListItem>
        </View>

        <ListItem>
          <Text>End turn</Text>
        </ListItem>
      </View>

      <View className="flex flex-col gap-1 w-full">
        <View className="flex flex-row gap-1 w-full">
          <View className="font-bold p-2 bg-gray-200 leading-none flex-1">
            <Text>moving into tile with</Text>
          </View>

          <View className="font-bold p-2 bg-gray-200 leading-none flex-1">
            <Text>energy used</Text>
          </View>
        </View>

        <table>
          <tbody>
            <tr>
              <td>
                no neutral or friendly
                <strong>bases</strong>
                or
                <strong>tunnels</strong>
              </td>
              <td>2</td>
            </tr>
            <tr>
              <td>
                neutral or friendly
                <strong>bases</strong>
                or
                <strong>tunnels</strong>
              </td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th style={{ width: "33%" }}>Event roll</th>
              <th>Outcome</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 dot</td>
              <td>draws one event token</td>
            </tr>
            <tr>
              <td>2 dot</td>
              <td>draws two event tokens</td>
            </tr>
            <tr>
              <td>3 dots</td>
              <td>draw three event tokens</td>
            </tr>
            <tr>
              <td>1 card</td>
              <td>roll six sided die then discards that many resource cards</td>
            </tr>
            <tr>
              <td>blank</td>
              <td>no event occurs</td>
            </tr>
          </tbody>
        </table>
      </View>
    </View>
  );
}

function ListItem({
  children,
  className,
  marker = "•",
}: {
  children: React.ReactNode;
  className?: string;
  marker?: string;
  depth?: string;
}) {
  return (
    <View
      className={["flex flex-row items-center", className]
        .filter(Boolean)
        .join(" ")}
    >
      <Text className="mx-2">{marker}</Text>
      {children}
    </View>
  );
}
