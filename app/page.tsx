"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Clock, MapPin, User, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CourseSchedule() {
  const [activeView, setActiveView] = useState<"list" | "timetable">("list")
  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({})

  const timeSlots = {
    "Aula 1 M": { start: "7:30", end: "8:20" },
    "Aula 2 M": { start: "8:20", end: "9:10" },
    "Aula 3 M": { start: "9:10", end: "10:00" },
    "Intervalo M": { start: "10:00", end: "10:20" },
    "Aula 4 M": { start: "10:20", end: "11:10" },
    "Aula 5 M": { start: "11:10", end: "12:00" },
  }

  const days = [
    { id: "seg", name: "SEG" },
    { id: "ter", name: "TER" },
    { id: "qua", name: "QUA" },
    { id: "qui", name: "QUI" },
    { id: "sex", name: "SEX" },
    { id: "sab", name: "SAB" },
  ]

  const scheduleData = [
    {
      slot: "Aula 1 M",
      seg: null,
      ter: null,
      qua: null,
      qui: null,
      sex: null,
      sab: null,
    },
    {
      slot: "Aula 2 M",
      seg: {
        name: "Fundamentos DevOps",
        professor: "Eduardo",
        location: "B2",
      },
      ter: {
        name: "Eng. Software I",
        professor: "Mehran",
        location: "B5",
      },
      qua: {
        name: "Extensão Universitária I",
        professor: "Marco Rojas, Maico, Mehran 2, Emerson 2",
        location: "B5",
      },
      qui: {
        name: "Fundamentos DevOps",
        professor: "Eduardo",
        location: "B2",
      },
      sex: {
        name: "Estatística e Probabilidade",
        professor: "Clodoaldo",
        location: "D205",
      },
      sab: null,
    },
    {
      slot: "Aula 3 M",
      seg: {
        name: "Fundamentos DevOps",
        professor: "Eduardo",
        location: "B2",
      },
      ter: {
        name: "Eng. Software I",
        professor: "Mehran",
        location: "B5",
      },
      qua: {
        name: "Extensão Universitária I",
        professor: "Marco Rojas, Maico, Mehran 2, Emerson 2",
        location: "B5",
      },
      qui: {
        name: "Fundamentos DevOps",
        professor: "Eduardo",
        location: "B2",
      },
      sex: {
        name: "Estatística e Probabilidade",
        professor: "Clodoaldo",
        location: "D205",
      },
      sab: null,
    },
    {
      slot: "Intervalo M",
      seg: { name: "Intervalo", professor: "", location: "" },
      ter: { name: "Intervalo", professor: "", location: "" },
      qua: { name: "Intervalo", professor: "", location: "" },
      qui: { name: "Intervalo", professor: "", location: "" },
      sex: { name: "Intervalo", professor: "", location: "" },
      sab: { name: "Intervalo", professor: "", location: "" },
    },
    {
      slot: "Aula 4 M",
      seg: {
        name: "Estrutura de Dados",
        professor: "André Luiz",
        location: "B2",
      },
      ter: {
        name: "Estatística e Probabilidade",
        professor: "Clodoaldo",
        location: "D204",
      },
      qua: {
        name: "Extensão Universitária I",
        professor: "Maico, Marco Rojas, Mehran 2, Emerson 2",
        location: "B5",
      },
      qui: {
        name: "Eng. Software I",
        professor: "Mehran",
        location: "B5",
      },
      sex: {
        name: "Estrutura de Dados",
        professor: "André Luiz",
        location: "B2",
      },
      sab: null,
    },
    {
      slot: "Aula 5 M",
      seg: {
        name: "Estrutura de Dados",
        professor: "André Luiz",
        location: "B2",
      },
      ter: {
        name: "Estatística e Probabilidade",
        professor: "Clodoaldo",
        location: "D204",
      },
      qua: {
        name: "Extensão Universitária I",
        professor: "Maico, Marco Rojas, Mehran 2, Emerson 2",
        location: "B5",
      },
      qui: {
        name: "Eng. Software I",
        professor: "Mehran",
        location: "B5",
      },
      sex: {
        name: "Estrutura de Dados",
        professor: "André Luiz",
        location: "B2",
      },
      sab: null,
    },
  ]

  const courses = [
    {
      id: "eng-software",
      name: "ENGENHARIA DE SOFTWARE I",
      professor: "Mehran",
      location: "Sala B5",
      schedule: "3M23 5M45 (17/03/2025 - 18/07/2025)",
      days: "Terça e Quinta",
      times: "8:20 - 10:00 e 10:20 - 12:00",
    },
    {
      id: "estatistica",
      name: "ESTATÍSTICA E PROBABILIDADE",
      professor: "Clodoaldo",
      location: "Sala D204/D205",
      schedule: "3M45 6M23 (17/03/2025 - 18/07/2025)",
      days: "Terça e Sexta",
      times: "10:20 - 12:00 e 8:20 - 10:00",
    },
    {
      id: "estrutura-dados",
      name: "ESTRUTURA DE DADOS",
      professor: "André Luiz",
      location: "Sala B2",
      schedule: "26M45 (17/03/2025 - 18/07/2025)",
      days: "Segunda e Sexta",
      times: "10:20 - 12:00",
    },
    {
      id: "extensao",
      name: "EXTENSÃO UNIVERSITÁRIA I",
      professor: "Marco Rojas, Maico, Mehran 2, Emerson 2",
      location: "Sala B5",
      schedule: "4M2345 (17/03/2025 - 18/07/2025)",
      days: "Quarta",
      times: "8:20 - 12:00",
    },
    {
      id: "devops",
      name: "FUNDAMENTOS DE DEVOPS",
      professor: "Eduardo",
      location: "Sala B2",
      schedule: "25M23 (17/03/2025 - 18/07/2025)",
      days: "Segunda e Quinta",
      times: "8:20 - 10:00",
    },
  ]

  const toggleCourse = (courseId: string) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }))
  }

  const getCellColor = (courseName: string | null) => {
    if (!courseName) return "bg-gray-50"
    if (courseName === "Intervalo") return "bg-gray-100"

    switch (courseName) {
      case "Eng. Software I":
      case "ENGENHARIA DE SOFTWARE I":
        return "bg-blue-50"
      case "Estatística e Probabilidade":
      case "ESTATÍSTICA E PROBABILIDADE":
        return "bg-green-50"
      case "Estrutura de Dados":
      case "ESTRUTURA DE DADOS":
        return "bg-yellow-50"
      case "Extensão Universitária I":
      case "EXTENSÃO UNIVERSITÁRIA I":
        return "bg-purple-50"
      case "Fundamentos DevOps":
      case "FUNDAMENTOS DE DEVOPS":
        return "bg-red-50"
      default:
        return "bg-gray-50"
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="absolute top-4 left-4 text-xs text-muted uppercase tracking-widest rotate-[-4deg]">
        <span className="bg-black text-white px-2 py-1 rounded-[0.2rem] font-bold">LSPRLABS</span>
      </div>
      <Card className="shadow-lg">
        <CardHeader className="bg-slate-100">
          <CardTitle className="text-xl font-bold text-center">Implementação de horários no SIGAA</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs
            value={activeView}
            onValueChange={(value) => setActiveView(value as "list" | "timetable")}
            className="w-full"
          >
            <div className="flex justify-center p-4 bg-slate-50">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="list">Lista de Disciplinas</TabsTrigger>
                <TabsTrigger value="timetable">Horário Semanal</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="timetable" className="m-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-200">
                      <th className="py-3 px-2 text-left font-semibold border">Horário</th>
                      {days.map((day) => (
                        <th key={day.id} className="py-3 px-2 text-center font-semibold border w-1/6">
                          {day.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleData.map((row, rowIndex) => (
                      <tr key={row.slot}>
                        <td className="py-2 px-2 border font-medium bg-slate-100">
                          <div>{row.slot}</div>
                          <div className="text-xs text-slate-500">
                            {timeSlots[row.slot as keyof typeof timeSlots]?.start} -{" "}
                            {timeSlots[row.slot as keyof typeof timeSlots]?.end}
                          </div>
                        </td>
                        {days.map((day) => {
                          const course = row[day.id as keyof typeof row] as {
                            name: string
                            professor: string
                            location: string
                          } | null
                          return (
                            <td
                              key={`${row.slot}-${day.id}`}
                              className={`py-2 px-2 border text-sm ${getCellColor(course?.name || null)}`}
                            >
                              {course && course.name !== "Intervalo" ? (
                                <div>
                                  <div className="font-medium">{course.name}</div>
                                  {course.professor && (
                                    <div className="flex items-center text-xs text-slate-600 mt-1">
                                      <User className="h-3 w-3 mr-1" />
                                      {course.professor}
                                    </div>
                                  )}
                                  {course.location && (
                                    <div className="flex items-center text-xs text-slate-600 mt-1">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      {course.location}
                                    </div>
                                  )}
                                </div>
                              ) : course?.name === "Intervalo" ? (
                                <div className="text-center italic text-slate-500">Intervalo</div>
                              ) : (
                                <div className="text-center text-slate-400">---</div>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="list" className="m-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-200">
                      <th className="py-3 px-4 text-left font-semibold">Componente Curricular</th>
                      <th className="py-3 px-4 text-left font-semibold">Local</th>
                      <th className="py-3 px-4 text-left font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.flatMap((course, index) => {
                      const rows = [
                        <tr
                          key={course.id}
                          className={`border-b ${index % 2 === 0 ? "bg-slate-50" : "bg-white"} hover:bg-slate-100 transition-colors`}
                        >
                          <td className="py-4 px-4 font-medium">{course.name}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-slate-500" />
                              {course.location}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleCourse(course.id)}
                              className="flex items-center gap-1"
                            >
                              {expandedCourses[course.id] ? (
                                <>
                                  Ocultar horários
                                  <ChevronUp className="h-4 w-4" />
                                </>
                              ) : (
                                <>
                                  Mostrar horários
                                  <ChevronDown className="h-4 w-4" />
                                </>
                              )}
                            </Button>
                          </td>
                        </tr>,
                      ]

                      if (expandedCourses[course.id]) {
                        rows.push(
                          <tr key={`${course.id}-details`} className={`${getCellColor(course.name)}`}>
                            <td colSpan={3} className="py-3 px-8 border-b">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-2">
                                  <Clock className="h-5 w-5 text-slate-500 mt-0.5" />
                                  <div>
                                    <p className="font-medium text-slate-700">Dias e Horários:</p>
                                    <p className="text-slate-600">{course.days}</p>
                                    <p className="text-slate-600">{course.times}</p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-2">
                                  <User className="h-5 w-5 text-slate-500 mt-0.5" />
                                  <div>
                                    <p className="font-medium text-slate-700">Professor:</p>
                                    <p className="text-slate-600">{course.professor}</p>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>,
                        )
                      }
                      return rows
                    })}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <footer className="py-4 text-center text-sm text-gray-500">
        <p className="text-xs text-center text-muted-foreground mt-4 italic">
          Feito com <Zap size={12} className="inline text-yellow-500" /> por{" "}
          <a href="https://lspr.dev" className="underline hover:text-gray-700 transition-colors">
            lspr.dev
          </a>
        </p>
      </footer>
    </div>
  )
}
