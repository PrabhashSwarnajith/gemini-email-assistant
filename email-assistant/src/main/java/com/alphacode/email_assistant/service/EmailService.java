package com.alphacode.email_assistant.service;

import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.alphacode.email_assistant.dto.EmailDto;
import org.springframework.web.reactive.function.client.WebClient;


@Service
public class EmailService {

    private final WebClient webClient;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;
    
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public EmailService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String generateEmailReply(EmailDto emailRequest) {

        //Build the prompt
        String prompt = buildPrompt(emailRequest);

        //Craft a request
        Map<String, Object> requestBody = Map.of(
            "contents", new Object[] {
                Map.of("parts", new Object[] {
                    Map.of("text", prompt)
                })
            }
        );

        //Do request and get the response
        String response = webClient.post()
                .uri(geminiApiUrl + geminiApiKey)
                .header("Content-Type","application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        //Return the response

        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            return root.path("candidates")
                    .get(0)
                    .path("contents")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

        }catch (Exception e) {
            return "Error processing request" +e.getMessage();
        }
    }

    private String buildPrompt(EmailDto emailRequest) {

        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a professional email reply for the following email content.");

        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append("Use a  " ).append(emailRequest.getTone()).append(" tone.");
        }
        prompt.append("\n Original email content: \n").append(emailRequest.getEmailContent());

        return prompt.toString();
    }

}
