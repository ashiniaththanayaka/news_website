import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  const mockArticles = [
    {
      _id: "1",
      title: "AI Revolution",
      category: "Tech",
      summary: "AI is changing the world.",
    },
    {
      _id: "2",
      title: "Market Surges",
      category: "Finance",
      summary: "Stocks hit an all-time high.",
    },
  ]

  return (
    <div>
      <h2 className="mb-6 text-3xl font-bold text-foreground">
        Latest Headlines
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockArticles.map((article) => (
          <Card key={article._id}>
            <CardHeader>
              <CardDescription>{article.category}</CardDescription>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                {article.summary}
              </p>
              <Button>Read More</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
