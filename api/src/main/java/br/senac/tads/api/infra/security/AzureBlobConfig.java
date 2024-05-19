package br.senac.tads.api.infra.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;

@Configuration
public class AzureBlobConfig {

	@Value("${azure.storage.account-name}")
	private String accountName;

	@Value("${azure.storage.account-key}")
	private String accountKey;

	@Value("${azure.storage.container-name}")
	private String containerName;

	@Bean
	public BlobServiceClient blobServiceClient() {
		String connectionString = String.format("DefaultEndpointsProtocol=https;AccountName=%s;AccountKey=%s",
				accountName, accountKey);
		return new BlobServiceClientBuilder().connectionString(connectionString).buildClient();
	}

	@Bean
	public BlobContainerClient blobContainerClient() {
		return blobServiceClient().getBlobContainerClient(containerName);
	}

}
