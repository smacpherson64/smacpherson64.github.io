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
      <Heading>
        <Text>round overview</Text>
      </Heading>

      <View className="flex flex-col gap-1 w-full px-2">
        <ListItem marker="1.">
          <Text className="font-bold">Reset energy</Text>
        </ListItem>

        <View className="ml-6">
          <Text>12 unless broken down last turn, then 6</Text>
        </View>

        <ListItem className="font-bold mt-2" marker="2.">
          <Text>Perform actions (until out of energy)</Text>
        </ListItem>

        <View className="ml-4 leading-2">
          <ListItem>
            <Text>Use rank card</Text>
          </ListItem>
          <ListItem>
            <Text>Request mission (1 energy)</Text>
          </ListItem>
          <ListItem>
            <Text>Complete mission</Text>
          </ListItem>
          <ListItem>
            <Text>Gather resources (3 energy)</Text>
          </ListItem>
          <ListItem>
            <Text>Trade resources (1 energy)</Text>
          </ListItem>
          <ListItem>
            <Text>Exchange resources (3 energy)</Text>
          </ListItem>
          <ListItem>
            <Text>Battle another player*</Text>
          </ListItem>
          <ListItem>
            <Text>Move (varied energy)</Text>
          </ListItem>
        </View>

        <ListItem marker="3.">
          <Text className="font-bold">End turn</Text>
        </ListItem>
      </View>

      <View className="flex flex-col gap-1 w-full mt-4">
        <View className="flex flex-row gap-1 w-full">
          <Heading className="basis-[50%]">
            <Text>moving into tile with...</Text>
          </Heading>

          <Heading className="basis-[50%]">
            <Text>energy used</Text>
          </Heading>
        </View>

        <View className="flex flex-row gap-1 w-full py-1">
          <Text className="basis-[50%] px-1">Cautious move (-1 events)</Text>
          <Text className="basis-[50%] px-1">4 energy</Text>
        </View>

        <View className="flex flex-row gap-1 w-full py-1 bg-gray-50">
          <Text className="basis-[50%] px-1">no base or friendly tunnel</Text>
          <Text className="basis-[50%] px-1">2 energy</Text>
        </View>

        <View className="flex flex-row gap-1 w-full py-1">
          <Text className="basis-[50%] px-1">base or friendly tunnel</Text>
          <Text className="basis-[50%] px-1">1 energy</Text>
        </View>
      </View>

      <View className="flex flex-col gap-1 w-full mt-4">
        <View className="flex flex-row gap-1 w-full">
          <Heading className="basis-[50%]">
            <Text>event roll</Text>
          </Heading>

          <Heading className="basis-[50%]">
            <Text>outcome</Text>
          </Heading>
        </View>

        <View className="flex flex-row gap-1 w-full py-1">
          <Text className="basis-[50%] px-1">1 dot</Text>
          <Text className="basis-[50%] px-1">draw one event token</Text>
        </View>

        <View className="flex flex-row gap-1 w-full py-1 bg-gray-50">
          <Text className="basis-[50%] px-1">2 dots</Text>
          <Text className="basis-[50%] px-1">draw two event token</Text>
        </View>

        <View className="flex flex-row gap-1 w-full py-1">
          <Text className="basis-[50%] px-1">3 dots</Text>
          <Text className="basis-[50%] px-1">draw three event token</Text>
        </View>

        <View className="flex flex-row gap-1 w-full py-1 bg-gray-50">
          <Text className="basis-[50%] px-1">1 card</Text>
          <View className="basis-[50%] px-1">
            <Text>roll 6 sided die then,</Text>
            <Text>discard resource cards</Text>
          </View>
        </View>

        <View className="flex flex-row gap-1 w-full py-1">
          <Text className="basis-[50%] px-1">blank</Text>
          <Text className="basis-[50%] px-1">no event</Text>
        </View>
      </View>

      <Heading>
        <Text>battle event</Text>
      </Heading>

      <View className="flex flex-col gap-1 w-full px-2">
        <ListItem>
          <Text>For a tie, re-roll.</Text>
        </ListItem>

        <ListItem>
          <Text>When enemie's roll is higher, player loses 1 energy.</Text>
        </ListItem>

        <ListItem>
          <Text>When player's roll is higher, enemy loses 1 hit point.</Text>
        </ListItem>

        <ListItem>
          <Text>When enemy runs out of health it is defeated.</Text>
        </ListItem>

        <ListItem>
          <Text>When 1 and 6 is rolled. Double losses.</Text>
          <Text></Text>
        </ListItem>
      </View>
    </View>
  );
}

function Heading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View
      className={twMerge(
        "font-bold bg-gray-100 text-gray-500 leading-0 p-1 w-full",
        className,
      )}
    >
      {children}
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
    <View className={twMerge("flex flex-row items-center mt-1", className)}>
      <Text className="mx-2">{marker}</Text>
      {children}
    </View>
  );
}

function twMerge(
  ...classNames: (
    | string
    | undefined
    | null
    | boolean
    | (string | undefined | null | boolean)[]
  )[]
) {
  return classNames.flat().filter(Boolean).join(" ");
}
