import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useMutation } from "react-query";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Textarea } from "./components/ui/textarea";

export interface ToxicityResult {
  identity_hate: number;
  insult: number;
  obscene: number;
  severe_toxic: number;
  threat: number;
}

function App() {
  const [data, setData] = useState<string>("");

  const mutation = useMutation({
    mutationFn: async (data: string) => {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: data }),
      });
      return response.json() as Promise<ToxicityResult>;
    },
  });

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      {mutation.isLoading && <p>Loading...</p>}
      {mutation.isSuccess && (
        <Card className="mb-8 w-96">
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p>
                Identity Hate: {(mutation.data.identity_hate * 100).toFixed(5)}%
              </p>
              <p>Insult: {(mutation.data.insult * 100).toFixed(5)}%</p>
              <p>Obscene: {(mutation.data.obscene * 100).toFixed(5)}%</p>
              <p>
                Severe Toxic: {(mutation.data.severe_toxic * 100).toFixed(5)}%
              </p>
              <p>Threat: {(mutation.data.threat * 100).toFixed(5)}%</p>
            </div>
          </CardContent>
        </Card>
      )}
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/101338?s=60"
            alt="GitHub Avatar"
          />
          <AvatarFallback>GN</AvatarFallback>
        </Avatar>
        <div>
          <Textarea
            placeholder="Type something..."
            cols={30}
            value={data}
            onChange={(ev) => setData(ev.target.value)}
          />
          <div className="flex justify-end mt-4">
            <Button onClick={() => mutation.mutate(data)}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
